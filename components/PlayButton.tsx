"use client"

import useOnPlay from "@/hooks/useOnPlay"
import { Episode } from "@/types"
import { FaPlay } from "react-icons/fa"
import { twMerge } from "tailwind-merge"


const PlayButton = ({
    className,
    episode,
    size = 20
} : {
    className?: string
    episode: Episode
    size?: number
}) => {
    const onPlay = useOnPlay();
    return (
        <button
        aria-label='play'
        onClick={() => onPlay(episode.id)}
        className={twMerge(`
        transition
        opacity-0
        rounded-full
        flex
        items-center
        bg-white
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        `, className)}
        >
            <FaPlay className="text-black" size={size}/>
        </button>
    )
}

export default PlayButton;