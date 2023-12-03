import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AudioPlayer from "./components/AudioPlayer";
import "./styles/customize-progress-bar.css";
import "./styles/rythem.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="bg-[#bbddee] h-[100vh] flex justify-center box-border">
      <AudioPlayer />
    </div>
  </React.StrictMode>
);
