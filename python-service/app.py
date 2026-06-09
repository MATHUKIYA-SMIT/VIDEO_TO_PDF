from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import HTTPException

from services.video_to_frames import video_to_frames
from services.frames_to_pdf import frames_to_pdf


app = FastAPI()

class VideoRequest(BaseModel):
    video_path: str
    video_id: int
    base_name: str

    frames_dir: str
    pdf_path: str


@app.get("/health")
def health():

    return {
        "status": "ok"
    }


@app.post("/process-video")
def process_video(
    request: VideoRequest
):

    try:

        video_to_frames(
            request.video_path,
            request.frames_dir
        )

        frames_to_pdf(
            request.frames_dir,
            request.pdf_path
        )

        return {
            "success": True,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )