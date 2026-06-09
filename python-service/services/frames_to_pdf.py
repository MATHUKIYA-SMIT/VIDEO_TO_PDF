import os
from PIL import Image
Image.init()

def frames_to_pdf(
    frames_dir,
    output_pdf
):

    images = []

    print("PDF MAKING IS STARTED ...")
    files = sorted(
        os.listdir(frames_dir),
        key=lambda x: int(x.split("_")[1].split(".")[0])
    )

    for file in files:
        if file.endswith(".jpg") or file.endswith(".png"):
            img_path = os.path.join(frames_dir, file)
            img = Image.open(img_path)
            img = img.convert("RGB")
            images.append(img)

    if not images:
        raise Exception("ERROR: No images found")

    images[0].save(
        output_pdf,
        save_all=True,
        append_images=images[1:]
    )

    print("PDF IS CREATED ...")

    return output_pdf