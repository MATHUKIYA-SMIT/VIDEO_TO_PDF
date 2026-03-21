import sys
import os
from PIL import Image

frames_dir = sys.argv[1]
output_pdf = sys.argv[2]

images = []

print("pdf making is started...")
files = sorted(
    os.listdir(frames_dir),
    key=lambda x: int(x.split("_")[1].split(".")[0])
)

for file in files:
    if file.endswith(".jpg") or file.endswith(".png"):
        img_path = os.path.join(frames_dir, file)
        img = Image.open(img_path).convert("RGB")
        images.append(img)

if not images:
    print("ERROR: No images found")
    sys.exit(1)

images[0].save(
    output_pdf,
    save_all=True,
    append_images=images[1:]
)

print(f"PDF_CREATED:{output_pdf}")
