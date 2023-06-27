"use client"

import useOnPlay from "@/hooks/useOnPlay"
import { Episode } from "@/types"
import { FaPlay } from "react-icons/fa"
import { twMerge } from "tailwind-merge"


const PlayButton = ({
    className,
    episode
} : {
    className?: string
    episode: Episode
}) => {
    const onPlay = useOnPlay();
    return (
        <button
        onClick={() => onPlay(episode.id)}
        className={twMerge(`
        transition
        opacity-0
        rounded-full
        flex
        items-center
        bg-amber-100
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110
        `, className)}
        >
            <FaPlay className="text-black" />
        </button>
    )
}

export default PlayButton;