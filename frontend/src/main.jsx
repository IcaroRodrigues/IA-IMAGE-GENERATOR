import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import ImageGenerator from "./pages/ImageGenerator.jsx";
import Feed from "./pages/Feed.jsx";
import History from "./pages/History.jsx";
import MyColection from "./pages/MyColection.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<ImageGenerator />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/history" element={<History />} />
        <Route path="/my-colection" element={<MyColection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
