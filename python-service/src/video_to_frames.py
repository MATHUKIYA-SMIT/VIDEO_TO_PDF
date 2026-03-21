import sys
import cv2
import numpy as np
import os
import time
from collections import defaultdict
from sklearn.cluster import DBSCAN

# ---------- ARGUMENTS ----------
if len(sys.argv) < 3:
    print("ERROR: video_path and output_dir required")
    sys.exit(1)

video_path = sys.argv[1]
output_dir = sys.argv[2]

start_time = time.time()

# ---------------- PARAMETERS ----------------

BLUR_THRESHOLD = 80
ADAPTIVE_PERCENT = 0.05      # 5% of frames for threshold learning
CLUSTER_SELECT_PERCENT = 0.6 # select 60% frames per cluster

EDGE_THRESHOLD = None
HASH_THRESHOLD = None
TEXT_REGION_MIN = None

CENTER_SHIFT_THRESHOLD = 25


# ---------- IMAGE ENHANCEMENT ----------

def sharpen_image(image):
    blur = cv2.GaussianBlur(image, (5,5), 0)
    return cv2.addWeighted(image, 1.5, blur, -0.5, 0)


def enhance_contrast(image):

    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l,a,b = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    l = clahe.apply(l)

    merged = cv2.merge((l,a,b))
    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)


# ---------- BLUR DETECTION ----------

def is_blurry(frame):

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()

    return variance < BLUR_THRESHOLD


# ---------- EDGE DIFFERENCE ----------

def edge_difference(gray1, gray2):

    e1 = cv2.Canny(gray1, 100, 200)
    e2 = cv2.Canny(gray2, 100, 200)

    diff = cv2.absdiff(e1, e2)

    percent = (np.count_nonzero(diff) / diff.size) * 100

    return percent


# ---------- TEXT REGIONS ----------

def get_text_regions(gray):

    edges = cv2.Canny(gray,100,200)

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(20,1))
    morph = cv2.morphologyEx(edges,cv2.MORPH_CLOSE,kernel)

    contours,_ = cv2.findContours(
        morph,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    centers = []
    text_regions = 0

    frame_h, frame_w = gray.shape

    min_h = int(frame_h * 0.03)   # ~5 px
    max_h = int(frame_h * 0.12)   # ~21 px

    for c in contours:

        x,y,w,h = cv2.boundingRect(c)

        if w*h < 350:
            continue

        if (min_h < h < max_h) and  (h*1.5 < w < frame_w * 0.9):

            text_regions += 1

            cx = x + w/2
            cy = y + h/2

            centers.append((cx,cy))

    return text_regions, centers


# ---------- REGION SHIFT ----------

def region_layout_shift(prev_centers, curr_centers):

    if prev_centers is None or curr_centers is None:
        return 1000

    if len(prev_centers) != len(curr_centers):
        return 1000

    shift = 0

    for (x1,y1),(x2,y2) in zip(prev_centers,curr_centers):

        dx = x1-x2
        dy = y1-y2

        shift += (dx*dx + dy*dy) ** 0.5

    return shift / max(1,len(prev_centers))


# ---------- PHASH ----------

def phash(image):

    resized = cv2.resize(image, (32,32))
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)

    dct = cv2.dct(np.float32(gray))

    dct_low = dct[:8,:8]
    avg = dct_low.mean()

    return (dct_low > avg).flatten()


def hash_distance(h1,h2):
    return np.count_nonzero(h1!=h2)


# ---------- CLUSTER ----------

def cluster_frames(features):

    features = np.array(features)

    db = DBSCAN(eps=8, min_samples=2)

    labels = db.fit_predict(features)

    return labels


# ---------- PHASH ----------

def phash(image):

    resized = cv2.resize(image,(32,32))
    gray = cv2.cvtColor(resized,cv2.COLOR_BGR2GRAY)

    dct = cv2.dct(np.float32(gray))

    dct_low = dct[:8,:8]
    avg = dct_low.mean()

    return (dct_low > avg).flatten()


def hash_distance(h1,h2):
    return np.count_nonzero(h1!=h2)


# ---------- CLUSTERING ----------

def cluster_frames(features):

    features = np.array(features)

    db = DBSCAN(eps=8,min_samples=2)

    labels = db.fit_predict(features)

    return labels


# ---------- SELECT FRAMES FROM CLUSTERS ----------

def select_frames_from_clusters(frames, timestamps, labels):

    clusters = defaultdict(list)

    # ---------- group frames by cluster ----------
    for i,label in enumerate(labels):

        if label == -1:
            continue

        clusters[label].append((timestamps[i],frames[i]))

    selected = []

    # ---------- process each cluster ----------
    for items in clusters.values():

        # sort cluster frames by timestamp
        items.sort(key=lambda x:x[0])

        n = len(items)

        # number of frames to select
        k = max(1,int(n*CLUSTER_SELECT_PERCENT))

        # compute sampling step
        step = n/k

        chosen_indices = []

        for i in range(k):

            index = int(round(i * step))

            if index >= n:
                index = n - 1

            chosen_indices.append(index)

        # ensure last frame is included
        chosen_indices[-1] = n - 1

        # select frames
        for idx in chosen_indices:
            selected.append(items[idx])

    return selected


# ---------- MAIN ----------

def extract_clean_slides_from_video(video_path, output_dir, sample_every_sec=2):

    global TEXT_REGION_MIN
    global EDGE_THRESHOLD
    global HASH_THRESHOLD

    os.makedirs(output_dir,exist_ok=True)

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("ERROR: cannot open video")
        return

    fps = int(cap.get(cv2.CAP_PROP_FPS)) or 25
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    frame_interval = int(fps*sample_every_sec)

    print("FPS:",fps)
    print("TOTAL FRAMES:",total_frames)

    adaptive_frames = int((total_frames/frame_interval)*ADAPTIVE_PERCENT)
    adaptive_frames = max(20,min(200,adaptive_frames))

    print("Adaptive learning frames:",adaptive_frames)

    prev_gray = None
    prev_hash = None
    prev_centers = None

    region_samples = []
    edge_samples = []
    hash_samples = []

    adaptive_ready = False

    candidate_frames = []
    candidate_features = []
    candidate_timestamps = []

    for frame_index in range(0,total_frames,frame_interval):

        cap.set(cv2.CAP_PROP_POS_FRAMES,frame_index)
        ret,frame = cap.read()

        if not ret:
            break

        if is_blurry(frame):
            continue

        small = cv2.resize(frame,(320,180))
        gray = cv2.cvtColor(small,cv2.COLOR_BGR2GRAY)

        regions,centers = get_text_regions(gray)

        if prev_gray is not None:
            edge_diff = edge_difference(prev_gray,gray)
        else:
            edge_diff = 0


        # ---------- ADAPTIVE ----------

        if not adaptive_ready:

            region_samples.append(regions)

            if prev_gray is not None:
                edge_samples.append(edge_diff)

            current_hash = phash(frame)

            if prev_hash is not None:
                hash_samples.append(
                    hash_distance(current_hash,prev_hash)
                )

            prev_hash = current_hash
            prev_gray = gray

            if len(region_samples) >= adaptive_frames:

                TEXT_REGION_MIN = max(
                    1,int(np.mean(region_samples)*0.4)
                )

                EDGE_THRESHOLD = max(
                    1,np.mean(edge_samples)*0.7
                )

                if len(hash_samples) > 0:

                    HASH_THRESHOLD = max(
                        4,int(np.mean(hash_samples)*0.7)
                    )
                else:
                    HASH_THRESHOLD = 6

                candidate_frames.append(frame)
                candidate_features.append(current_hash)
                candidate_timestamps.append(frame_index)

                adaptive_ready = True

            continue


        # ---------- FILTER ----------

        if edge_diff < EDGE_THRESHOLD:
            continue

        if regions < TEXT_REGION_MIN:
            continue

        current_hash = phash(frame)

        dist = hash_distance(current_hash,prev_hash)

        shift = region_layout_shift(
            prev_centers,
            centers
        )

        if dist < HASH_THRESHOLD and shift < CENTER_SHIFT_THRESHOLD:
            continue


        candidate_frames.append(frame)
        candidate_features.append(current_hash)
        candidate_timestamps.append(frame_index)

        prev_hash = current_hash
        prev_gray = gray
        prev_centers = centers


    cap.release()

    print("Candidate frames:",len(candidate_frames))

    # ---------- CLUSTERING ----------
    labels = cluster_frames(candidate_features)

    selected_frames = select_frames_from_clusters(
        candidate_frames,
        candidate_timestamps,
        labels
    )

    # ---------- SORT BY TIMESTAMP ----------
    selected_frames.sort(key=lambda x:x[0])

    slide_index = 0

    # ---------- SAVE SLIDES ----------
    for timestamp,frame in selected_frames:

        enhanced = enhance_contrast(sharpen_image(frame))

        out_path = os.path.join(output_dir,f"slide_{slide_index}.png")

        cv2.imwrite(out_path, enhanced)

        slide_index+=1

    print("EXTRACTED:",slide_index)
    print("TIME:",round(time.time()-start_time,2),"sec")


# ---------- RUN ----------
extract_clean_slides_from_video(video_path,output_dir)