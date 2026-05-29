import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { themeConfig } from "./config";

document.title = themeConfig.templateName;

// Dynamically set the favicon from the runtime/environment configuration
const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (favicon && themeConfig.logoUrl) {
  favicon.href = themeConfig.logoUrl;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
