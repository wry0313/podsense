"use client";

import { Episode } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";
import useDebounce from "@/hooks/useDebounce";

const PlayerContent = ({
  episode,
  episodeUrl,
}: {
  episode: Episode;
  episodeUrl: string;
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const [value, setValue] = useState(0);
  const [barValue, setBarValue] = useState(0);
  const debouncedValue = useDebounce(value, 10);
  const [currTime, setCurrTime] = useState("00:00");

  useEffect(()=>{
    sound?.seek(debouncedValue);
}, [debouncedValue]);


  const [play, { pause, duration, sound }] = useSound(episodeUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  const fullTime = useMemo(() => {
    return convertSecondsToHMS(episode.duration);
  },[])

  function convertSecondsToHMS(seconds : number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedHours = hours > 0 ? hours.toString().padStart(1, '0') + ':' : '';
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return formattedHours + formattedMinutes + ':' + formattedSeconds;
  }

  useEffect(() => {
    setCurrTime(convertSecondsToHMS(value));
  }, [value]);

  useEffect(() => {
    const interval = setInterval(() => {
      const curSec = (sound?.seek([]) || 0);
      setBarValue(curSec);
      if (typeof curSec === 'number') setCurrTime(convertSecondsToHMS(curSec));
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextEpisode = player.ids[currentIndex + 1];
    if (!nextEpisode) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextEpisode);
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousEpisode = player.ids[currentIndex - 1];
    if (!previousEpisode) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousEpisode);
  };

  return (
    
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">

      <div
        className="flex w-full justify-start pr-10">
        <div className="flex flex-col items-center mr-4 max-w-[280px] overflow-hidden">
          <MediaItem data={episode} isPodcast={false} />
        </div>
        <LikeButton podcast_id={episode.podcast_id} />
      </div>

      <div className="flex flex-col">
      <div
        className="
                flex
                md:hidden
                col-auto
                w-full
                justify-end
                items-center
            "
      >
        <div
          onClick={handlePlay}
          className="
                h-10
                w-10
                flex
                items-center
                justify-center
                rounded-full
                bg-amber-200
                p-1
                cursor-pointer
                "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div
        className="
                hidden
                h-fit
                md:flex
                justify-center
                items-center
                w-full
                max-w-[722px]
                gap-x-6
            "
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-black cursor-pointer hover:text-neutral-400 transition "
        />
        <div
          onClick={handlePlay}
          className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-amber-200
                        p-1
                        cursor-pointer
                    "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-black cursor-pointer hover:text-neutral-400 transition "
        />
      </div>

      <div className="flex flex-row gap-x-2 items-center text-sm text-neutral-600">

        {currTime}

        <Slider
            value={barValue}
            onChange={(value) => {
                setValue(value);
                setBarValue(value)
            }}
            defaultValue={[0]}
            max={duration ? duration / 1000 : 0}
            ariaLabel="Timeline Slider"
            step={1}
        />

        {fullTime }
      </div>
        

      </div>


      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={24}
          />
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
            defaultValue={[1]}
            max={1}
            step={0.05}
            ariaLabel="Volume Slider"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
