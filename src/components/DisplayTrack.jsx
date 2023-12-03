import { BsMusicNoteBeamed } from "react-icons/bs";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  tracks,
  trackIndex,
  setCurrentTrack,
  setTrackIndex,
  displayShow,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef?.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  return (
    <div>
      {/* short img */}
      <div
        className={` flex h-[20vh]  bg-gradient-to-t from-[#1f225e] to-[#000] ${
          displayShow ? "hidden" : "block"
        }`}
      >
        <div className=" flex mt-[40px] ml-[20px] ">
          <div className=" overflow-hidden w-[55px] h-[55px] rounded-[10px] flex justify-center items-center">
            {currentTrack.thumbnail ? (
              <img
                className="  object-cover"
                src={currentTrack.thumbnail}
                alt="audio avatar"
              />
            ) : (
              <span className="audio-icon text-[1em] ">
                <BsMusicNoteBeamed />
              </span>
            )}
          </div>
          <div className=" p-[7px] pt-[16px]  text-[#fff]">
            <p className="text-[.9em] ">{currentTrack.title}</p>
            <p className="text-[.7em] text-[#ffffff8f]">
              {currentTrack.author}
            </p>
          </div>
        </div>
      </div>

      {/* /////////////////////////////////////////////////////// */}
      <div
        className={` h-[63vh] sm: w-full  lg:w-[500px] ${
          displayShow ? "block" : "hidden"
        }`}
      >
        <audio
          src={currentTrack.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => {
            if (trackIndex >= tracks.length - 1) {
              setTrackIndex(0);
              setCurrentTrack(tracks[0]);
            } else {
              setTrackIndex((prev) => prev + 1);
              setCurrentTrack(tracks[trackIndex + 1]);
            }
          }}
        />

        <div className=" overflow-hidden">
          <div className="flex mt-[20px]  justify-center">
            {currentTrack.thumbnail ? (
              <img
                className=" w-[70%] rounded-[10%] border-[1px] border-[#3333333c] shadow-[0_0_8px_#333]  h-full object-cover"
                src={currentTrack.thumbnail}
                alt="song img"
              />
            ) : (
              <div className="flex items-center justify-center p-[70px]  rounded-[10%] h-full object-cover border-[1px] border-[#d1d1d13c] bg-[#0000004d] shadow-[0_0_8px_#ddd] ">
                <span className="text-[7.2em] text-[#ddd] drop-shadow-[0_0_8px_#ddd]">
                  <BsMusicNoteBeamed />
                </span>
              </div>
            )}
          </div>
          <div className="pt-[20px]">
            <p className=" text-[2.2em] text-[#fff]  lg:text-[2.4em] pt-[15px]">
              {currentTrack.title}
            </p>
            <p className="text-[#c9c9c98f]">{currentTrack.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
