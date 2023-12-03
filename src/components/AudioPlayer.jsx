import { useRef, useState } from "react";
import { tracks } from "../data/tracks";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { FaAngleDown } from "react-icons/fa6";
import MusicCards from "./MusicCards";
const AudioPlayer = () => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [isHovered, setIsHovered] = useState(false);
  const [displayShow, setDisplayShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef();

  const progressBarRef = useRef();
  function isDisplayShow() {
    displayShow === true ? setDisplayShow(false) : setDisplayShow(true);
  }
  return (
    <div className="relative w-full lg:w-[500px]">
      <div className=" h-[14.2vh]   bg-gradient-to-t from-[#000] to-[#1f225e] flex items-center pl-[10%] z-0">
        <h1
          className="text-[2.2em] drop-shadow-[0_0_5px_#333] font-bold font-mono text-white
        "
        >
          Songs
        </h1>
      </div>
      <div className=" cards h-[80vh] bg-gradient-to-t from-[#000] to-[#1f225e] overflow-y-auto ">
        <MusicCards
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressBarRef,
            tracks,
            trackIndex,
            setCurrentTrack,
            setTrackIndex,
            displayShow,
            isPlaying,
            setIsPlaying,
          }}
        />
      </div>
      <div
        className={` z-10  bg-gradient-to-t from-[#1f225e] to-[#000] overflow-hidden drop-shadow-[0_0_7px_#333] w-full lg:w-[500px]   transition-all duration-500  rounded-t-[20px]  absolute bottom-[0] 
      ${displayShow ? "h-[96vh] p-[20px]" : "h-[20vh]"}`}
      >
        <span
          className={`z-50 absolute right-[30px] focus:drop-shadow-[0_0_8px_#333] top-[0] p-[7px] border-[1px] border-[#fff0] shadow-[0_0_5px_#ffffff2a]   text-[#ffffff9a] text-[1.2em] transition-all duration-500 ${
            isHovered ? "rounded-[50%]" : "rounded-[25%]"
          }`}
          onClick={isDisplayShow}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaAngleDown />
        </span>
        <DisplayTrack
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressBarRef,
            tracks,
            trackIndex,
            setCurrentTrack,
            setTrackIndex,
            displayShow,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration, displayShow }}
        />
        <Controls
          {...{
            audioRef,
            progressBarRef,
            duration,
            setTimeProgress,
            tracks,
            trackIndex,
            setCurrentTrack,
            currentTrack,
            setTrackIndex,
            displayShow,
            isPlaying,
            setIsPlaying,
          }}
        />
      </div>
    </div>
  );
};
export default AudioPlayer;
