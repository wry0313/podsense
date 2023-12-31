import { FaPlay } from "react-icons/fa"
import { twMerge } from "tailwind-merge"


const PlayButtonDecor = ({
    className,
    onClick
} : {
    className?: string
    onClick?: () => void
}) => {
    return (
        <button
        aria-label='play'
        onClick={onClick}
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
        hover:scale-110
        `, className)}
        >
            <FaPlay className="text-black" />
        </button>
    )
}

export default PlayButtonDecor;