"use client";

import { Episode } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";

import { useEffect, useState } from "react";
import useSound from "use-sound";

import { debounce } from "throttle-debounce";

const PlayerContent = ({
  episode,
  episodeUrl,
}: {
  episode: Episode;
  episodeUrl: string;
}) => {
  // const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [fullTime, setFullTime] = useState("");

  const [isSliding, setIsSliding] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [play, { pause, duration, sound }] = useSound(episodeUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
    html5: true, // Force HTML5 so that we can stream large files. NEEDED
    loop: true,
  });

  function convertSecondsToHMS(seconds: number | null) {
    if (seconds === null) return "00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedHours =
      hours > 0 ? hours.toString().padStart(1, "0") + ":" : "";
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return formattedHours + formattedMinutes + ":" + formattedSeconds;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && !isSliding) {
        const currSec = sound.seek();
        setSliderValue(currSec);
        setCurrTime(currSec);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound, isSliding]);

  const handleSeek = debounce(2000, (value) => {
    sound.seek(value);
    setIsSliding(false);
    setIsLoading(false);
  });

  useEffect(() => {
    sound?.play();
    setFullTime(convertSecondsToHMS(duration! / 1000));
    return () => {
      sound?.unload();
    };
  }, [sound, duration]);

  const handlePlay = () => {
    isPlaying ? pause() : play();
  };

  const toggleMute = () => {
    volume ? setVolume(0) : setVolume(1);
  };

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onForward = () => {
    let newTime = currTime + 15;

    if (newTime > duration! / 1000) {
      newTime = duration! / 1000;
    }
    setCurrTime(newTime);
    sound?.seek(newTime);
  };

  const onBackward = () => {
    let newTime = currTime - 15;
    if (newTime < 0) {
      newTime = 0;
    }
    setCurrTime(newTime);
    sound?.seek(newTime);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 h-full">
      {episode ? (
        <div className="hidden sm:flex w-full justify-cente pr-10">
          <div className="flex flex-col items-center mr-4 max-w-[300px] overflow-hidden">
            <MediaItem data={episode} isPodcast={false} />
          </div>
          <LikeButton podcast_id={episode.podcast_id} />
        </div>
      ) : (
        <div className="mr-4 max-w-[280px]">
          </div>
      )}

      <div className="flex flex-col">
        <div
          className="
                h-fit
                flex
                justify-center
                items-center
                w-full
                max-w-[722px]
                gap-x-6
            "
        >
          <AiFillStepBackward
            onClick={onBackward}
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
            onClick={onForward}
            size={30}
            className="text-black cursor-pointer hover:text-neutral-400 transition "
          />
        </div>

        <div className="flex flex-row gap-x-2 items-center text-sm text-neutral-600">
          {convertSecondsToHMS(currTime)}

          <Slider
            isLoading={isLoading}
            value={sliderValue}
            onChange={(value) => {
              setIsSliding(true);
              setCurrTime(value);
              setSliderValue(value);
            }}
            onCommit={(value) => {
              setCurrTime(value);
              handleSeek(value);
              setIsLoading(true);
            }}
            defaultValue={[0]}
            max={duration ? duration / 1000 : 0}
            ariaLabel="Timeline Slider"
            step={1}
          />

          {fullTime}
        </div>
      </div>
      <div className="hidden sm:flex w-full justify-end pr-2">
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
