import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/features/auth/contexts/AuthContext.jsx";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UsageProvider } from "@/features/user/contexts/UsageContext";
import { FileProvider } from "@/features/user/contexts/FileContext";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import "@/styles/theme-light.css";
import "@/styles/theme-dark.css";

import App from "./App.jsx";

const navEntries = performance.getEntriesByType("navigation");
if (navEntries.length > 0 && navEntries[0].type === "back_forward") {
  console.log("🔥 Back/Forward detected → forcing reload");
  window.location.reload();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
          <BrowserRouter>
            <ThemeProvider>
              <UsageProvider>
                <FileProvider>
                  <App />
                </FileProvider>
              </UsageProvider>
            </ThemeProvider>
          </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
