import { useState, useEffect, useRef, useCallback } from "react";

// icons
import { MdOutlineForward10 } from "react-icons/md";
import { GrBackTen } from "react-icons/gr";
import { BiShuffle } from "react-icons/bi";
import {
  FaForward,
  FaBackward,
  FaPlay,
  FaPause,
  FaVolumeHigh,
  FaVolumeLow,
  FaVolumeXmark,
} from "react-icons/fa6";
const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setCurrentTrack,
  setTrackIndex,
  displayShow,
  isPlaying,
  setIsPlaying,
}) => {
  const togglePlayPause = () => {
    setIsPlaying((a) => !a);
  };
  const playAnimationRef = useRef();
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };
  function shuffle() {
    console.log("salam");
  }
  const [showRange, setShowRange] = useState(false);
  return (
    <div className="controls-wrapper ">
      {/* SHORT PLAY PAUSE */}
      <div
        className={` absolute top-12 right-[20px] text-[#fff] transition-all duration-1000 ${
          displayShow ? "hidden" : "block"
        } `}
      >
        <button className="text-[2em]" onClick={handlePrevious}>
          <FaBackward />
        </button>
        <button
          className="text-[2em] mx-[25px] p-2 border-[1px] rounded-[50%] border-[#ff000000] focus:shadow-[0_0_3px_#ddd] focus:bg-[#ffffff2e]"
          onClick={togglePlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="text-[2em]" onClick={handleNext}>
          <FaForward />
        </button>
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////////////// */}

      <div
        className={`controls flex relative justify-center text-[#ccc4dd] pt-[30px] py-[20px] ${
          displayShow ? "block" : "hidden"
        } `}
      >
        <button
          className=" absolute left-5 pt-[10px] text-[1.2em]"
          onClick={skipBackward}
        >
          <GrBackTen />
        </button>

        <button
          onClick={shuffle}
          className="text-[2em] fixed left-[20px] top-5"
        >
          <BiShuffle />
        </button>
        <div>
          <button className="text-[2.5em]" onClick={handlePrevious}>
            <FaBackward />
          </button>
          <button className="text-[2.5em] px-[45px]" onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="text-[2.5em]" onClick={handleNext}>
            <FaForward />
          </button>
        </div>
        <button
          className=" absolute right-5 pt-[10px] text-[1.5em]"
          onClick={skipForward}
        >
          <MdOutlineForward10 />
        </button>
      </div>
      <div className="volume flex flex-col fixed bottom-[300px] right-0">
        {showRange && (
          <input
            className=" transform rotate-[-90deg] w-[100px] absolute right-[-20px] "
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{
              background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
            }}
          />
        )}
        <button
          className={` absolute right-[20px] bottom-[-70px] text-[#ffffff] ${
            displayShow ? "block" : "hidden"
          }`}
          onMouseEnter={() => setShowRange(true)}
          onMouseLeave={() => setTimeout(() => setShowRange(false), 2000)}
          onClick={() => setMuteVolume((prev) => !prev)}
        >
          {muteVolume || volume < 5 ? (
            <FaVolumeXmark />
          ) : volume < 40 ? (
            <FaVolumeLow />
          ) : (
            <FaVolumeHigh />
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;
