"use client"

import Image from "next/image";
import Link from "next/link";
import { Podcast } from "@/types"
import PlayButtonDecor from "./PlayButtonDecor";

interface PodcastItemProps {
    podcast: Podcast;
}
const PodcastItem: React.FC<PodcastItemProps> = ({
    podcast,
}) => {
    return ( 
        <Link
            href={`/podcast/${podcast.id}`}
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
                shadow-md
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
                src={podcast.image_url!}
                fill 
                alt="wef"
                sizes="
                (max-width: 1536px) 10vw,
                20vw"
                priority={true}
            />
           </div>
           <div className=" flex flex-col items-start w-full pt-2 gap-y-1">
                <h1 className="font-semibold truncate w-full">
                    {podcast.title}
                </h1>
                <p className="text-neutral-400 text-sm  w-full truncate">
                    By {podcast.host}
                </p>
           </div>
           <div className="absolute bottom-[4.7rem] right-5">
                <PlayButtonDecor/>
           </div>
        </Link>
     );
}
 
export default PodcastItem;