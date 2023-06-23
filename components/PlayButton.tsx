import { FaPlay } from "react-icons/fa"
import { twMerge } from "tailwind-merge"


const PlayButton = ({
    className,
    onClick
} : {
    className?: string
    onClick?: () => void
}) => {
    return (
        <button
        onClick={onClick}
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