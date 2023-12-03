import React from "react";

const ProgressBar = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
  displayShow,
}) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  return (
    <div
      className={`progress flex flex-col ${displayShow ? "block" : "hidden"}`}
    >
      <input
        className="w-[100%] m-0 bg-black"
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />

      <div className=" flex justify-between mt-2">
        <span className="time current text-white text-[.9em]">
          {formatTime(timeProgress)}
        </span>
        <span className="time text-white text-[.9em]">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
