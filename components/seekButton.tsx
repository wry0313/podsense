"use client";

import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import { FaPlay } from "react-icons/fa";
import { convertSecondsToHMS } from "@/utils/timeUtils";

const SeekButton = ({
  seekTime,
  episode_id,
  podcast_id,
}: {
  seekTime: number;
  episode_id: string;
  podcast_id: string;
}) => {
  const player = usePlayer();
  const onPlay = useOnPlay();
  const handleClick = () => {
    if (player.activeId !== episode_id) {
      onPlay(episode_id, podcast_id);
      player.setNeedSet(true);
      player.setNeedSetTime(seekTime);
    } else {
      player.audioRef!.current!.currentTime = seekTime;
      player.audioRef!.current!.play();
      player.setPlaying(true);
    }
  };
  return (
    <button
      className="
        flex flex-row items-center gap-x-2 select-none hover:text-sky-500 transition text-sm text-neutral-500"
      onClick={handleClick}
    >
      <FaPlay
        className="
        drop-shadow-sm
        "
        size={12}
      />

      <div className="">
        {convertSecondsToHMS(seekTime)}
      </div>
    </button>
  );
};

export default SeekButton;
