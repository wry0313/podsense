"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Podcast } from "@/types"
import Image from "next/image";
import PlayButton from "./PlayButton";


interface PodcastItemProps {
    data: Podcast;
    onClick: (title:string) => void;
}
const PodcastItem: React.FC<PodcastItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);
    return ( 
        <div
            onClick={()=> onClick(data.title)}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                hover:bg-neutral-400/10
                cursor-pointer
                transition
                p-3
            "
        >
           <div 
            className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
            "
           >
            <Image
                className="object-cover"
                src={imagePath || "/images/liked.png"}
                fill 
                alt="Image"
            />
           </div>
           <div className=" flex flex-col items-start w-full pt-2 gap-y-1">
                <p className="font-semibold truncate w-full">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm  w-full truncate">
                    By {data.host}
                </p>
           </div>
           <div className="absolute bottom-[4.7rem] right-5">
                <PlayButton/>
           </div>
        </div>
     );
}
 
export default PodcastItem;