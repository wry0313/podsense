"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Episode } from "@/types";

import { useEffect, useState, useRef } from "react";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

import { convertSecondsToHMS } from "@/utils/timeUtils";
import usePlayer from "@/hooks/usePlayer";

const PlayerContent = ({ episode }: { episode: Episode }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current!.src = episode.audio_url!;
    audioRef.current!.load();
    play();
    player.setLoaded(true);
    player.setAudioRef(audioRef);
    audioRef.current!.onloadedmetadata = function () {
      setDuration(audioRef.current!.duration);
      if (player.needSet) {
        seekTo(player.needSetTime!);
        player.setNeedSet(false);
        play();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current!.duration && !isSliding) {
        const seekPosition = audioRef.current!.currentTime;
        setCurrTime(seekPosition);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isSliding]);

  const seekTo = (value: number) => {
    audioRef.current!.currentTime = value;
  };

  const play = () => {
    audioRef.current!.play();
    setIsPlaying(true);
  };
  const pause = () => {
    audioRef.current!.pause();
    setIsPlaying(false);
  };
  const handlePlay = () => {
    isPlaying ? pause() : play();
  };

  const toggleMute = () => {
    volume ? handleSetVolume(0) : handleSetVolume(1);
  };

  const handleSetVolume = (volume: number) => {
    audioRef.current!.volume = volume;
    setVolume(volume);
  };

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onForward = () => {
    let newTime = currTime + 15;

    if (newTime > duration!) {
      newTime = duration!;
    }
    setCurrTime(newTime);
    seekTo(newTime);
  };

  const onBackward = () => {
    let newTime = currTime - 15;
    if (newTime < 0) {
      newTime = 0;
    }
    setCurrTime(newTime);
    seekTo(newTime);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 h-full">
      <audio ref={audioRef}></audio>
      {episode ? (
        <div className="hidden sm:flex w-full justify-cente pr-10">
          <div className="flex flex-col items-center mr-4 max-w-[300px] overflow-hidden">
            <MediaItem data={episode} isPodcast={false} />
          </div>
          <LikeButton podcast_id={episode.podcast_id!} />
        </div>
      ) : (
        <div className="mr-4 max-w-[280px]"></div>
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
            className="cursor-pointer hover:text-neutral-400 dark:hover:text-dark-400 transition "
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
                        bg-neutral-300
                        dark:bg-neutral-100
                        p-1
                        cursor-pointer
                    "
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onForward}
            size={30}
            className="cursor-pointer hover:text-neutral-400 dark:hover:text-dark-400 transition "
          />
        </div>

        <div className="flex flex-row gap-x-2 items-center text-sm text-neutral-600 dark:text-dark-800">
          {convertSecondsToHMS(currTime)}

          <Slider
            value={currTime}
            onChange={(value) => {
              setIsSliding(true);
              setCurrTime(value);
            }}
            onCommit={(value) => {
              setCurrTime(value);
              seekTo(value);
              setIsSliding(false);
            }}
            defaultValue={[0]}
            max={duration}
            ariaLabel="Timeline Slider"
            step={1}
          />

          {convertSecondsToHMS(duration)}
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
            onChange={(value) => handleSetVolume(value)}
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
