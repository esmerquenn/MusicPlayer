import React from "react";

import doctor from "./../data/music.jpeg";
import Rythm from "./Rythm";
function MusicCards({
  currentTrack,
  tracks,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
}) {
  function togglePlayPause(item) {
    setCurrentTrack(tracks[item.id]);
    setIsPlaying(true);
    console.log(currentTrack);
  }
  return (
    <div>
      <div className=" w-[100%] p-2 rounded-lg shadow sm:p-5   bg-gradient-to-t from-[#1f225e] to-[#000]">
        <ul>
          {tracks.map((item, index) => (
            <li
              onClick={() => togglePlayPause(item)}
              key={index}
              className="p-2 h-[8.5vh] mb-1 rounded-md shadow  transition duration-500  bg-[#1f225e7f]  hover:bg-gradient-to-r from-[#583d9152] to-[#4b69fe82]"
            >
              <div className="flex items-end ">
                <div className="flex-shrink-0 ">
                  <img
                    className="w-9 h-9 rounded-md drop-shadow-[0_0_2px_#4b69fe]"
                    src={item.thumbnail ? item.thumbnail : doctor}
                    alt="song name"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-[.86em] text-white">{item.title}</p>
                  <p className="text-[.7em] font-[arial] text-[#ffffff8f] ">
                    {item.author}
                  </p>
                </div>
                <div className="pr-[7px]">
                  {isPlaying && currentTrack.id === index ? <Rythm /> : ""}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MusicCards;
