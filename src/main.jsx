// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";

// Apply saved theme before first paint
const saved = localStorage.getItem("startmatch-theme") || "light";
document.documentElement.setAttribute("data-theme", saved);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
