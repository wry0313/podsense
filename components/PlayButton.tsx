"use client"

import useOnPlay from "@/hooks/useOnPlay"
import usePlayer from "@/hooks/usePlayer"
import { FaPlay, FaPause } from "react-icons/fa"
import { twMerge } from "tailwind-merge"

const PlayButton = ({
    className,
    episode_id,
    podcast_id,
    size = 20
} : {
    className?: string
    episode_id: string
    podcast_id: string
    size?: number
}) => {
    const player = usePlayer();
    const onPlay = useOnPlay();

    const handleClick = () => {
        if (player.activeId === episode_id) {
            if (player.playing) {
                player.audioRef!.current!.pause();
                player.setPlaying(false);
            } else {
                player.audioRef!.current!.play();
                player.setPlaying(true);
            }
        } else {
            onPlay(episode_id, podcast_id);
        }
    }

    return (
        <button
        aria-label='play'
        onClick={handleClick}
        className={twMerge(`
        transition
        rounded-full
        flex
        items-center
        bg-white
        p-4
        drop-shadow-md
        opacity-0
        group-hover:opacity-100
        `, className)}
        >
            
            {player.activeId === episode_id && player.playing ? (
                <FaPause className="text-black" size={size}/>
            ) : (
                <FaPlay className="text-black" size={size}/>
            )}
        </button>
    )
}

export default PlayButton;