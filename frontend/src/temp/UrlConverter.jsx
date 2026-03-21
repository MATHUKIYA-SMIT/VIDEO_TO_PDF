import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

import * as urlConverterHandler from "@/features/url/handlers/urlConverter.handler";
import "./UrlConverter.css"

const UrlConverter = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
  console.log("UrlConverter mounted");
  return () => console.log("UrlConverter unmounted");
}, []);

  const submitUrl = async (event) =>{
    // if (isProcessing) return; // extra safety
    // try {
    //   setIsProcessing(true); // 🔒 disable button
    //   await urlConverterHandler.convertVideo(event);
    // }finally {
    //   setIsProcessing(false); // 🔓 enable button
    // }
        event.preventDefault();

    if (isProcessing) return;

    setIsProcessing(true); // 🔒 disable button

    // ⏳ Simulate async work (5 seconds)
    setTimeout(() => {
      setIsProcessing(false); // 🔓 enable button
      console.log("Fake processing completed");
    }, 20000);
  }
  return (
    <section className="converter-wrapper">
      <div className="container my-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center">
            <img
              src="/yt-image.png"
              alt="YouTube to PDF converter illustration"
              className="img-fluid yt-illustration"
            />
          </div>

          <div className="col-lg-6">
            <form onSubmit={submitUrl} className="d-flex flex-column gap-3">
              <input
                type="text"
                className="form-control form-control-lg py-5"
                placeholder="Paste YouTube video URL here..."
                name="url"
                disabled={isProcessing}
              />
              <button
                type="submit"
                className="btn btn-danger btn-lg align-self-start d-flex align-items-center gap-2 converter-btn"
                disabled={isProcessing}
                style={{ cursor: isProcessing ? "not-allowed" : "pointer" }}
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="spin" />
                    Processing...
                  </>
                ) : (
                  "Convert Video to PDF"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlConverter;
