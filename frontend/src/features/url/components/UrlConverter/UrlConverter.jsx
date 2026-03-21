import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

import * as urlConverterHandler from "@/features/url/handlers/urlConverter.handler";
import { useUsage } from "@/features/user/contexts/UsageContext";
import { useFiles } from "@/features/user/contexts/FileContext";
import "./UrlConverter.css"

const UrlConverter = () => {
  const { reloadUsage } = useUsage();
  const { reloadFiles } = useFiles();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const submitUrl = async (event) =>{
    if (isProcessing) return; // extra safety
    try {
      setIsProcessing(true); // 🔒 disable button
      await urlConverterHandler.convertVideo(event, setError);
      await reloadUsage();  // 🔥 auto refresh sidebar usage
      await reloadFiles();
    }finally {
      setIsProcessing(false); // 🔓 enable button
    }
  }
  return (
    <section className="converter-wrapper">
      <div className="container my-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center">
            <img
              src="/images/yt-image.png"
              alt="YouTube to PDF converter illustration"
              className="img-fluid yt-illustration"
            />
          </div>

          <div className="col-lg-6">
            <form onSubmit={submitUrl} className="d-flex flex-column gap-3">
              <input
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube video URL here..."
                className={`form-control form-control-lg py-5 ${error ? "converter-error" : ""}`}
                disabled={isProcessing}
              />
              {error && <p className="url-converter-error">{error}</p>}
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
