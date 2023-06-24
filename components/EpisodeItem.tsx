"use client"

import Image from "next/image";
import { Episode } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import PlayButton from "./PlayButton";
import Link from "next/link";
import useOnPlay from "@/hooks/useOnPlay";


interface EpisodeItemProps {
  episode: Episode;
}

function convertDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    let result = '';
    if (hours > 0) {
      result += hours + ' hr ';
    }
    if (remainingMinutes > 0) {
      result += remainingMinutes + ' min';
    }
  
    return result.trim();
  }
  

const EpisodeItem = ({ episode }: EpisodeItemProps) => {
    const imagePath = useLoadImage(episode)
    const onPlay = useOnPlay([episode])
  return (
    <Link 
    href={'/episode/' + episode.id}
    className="flex items-start gap-x-4 border-t-2 pt-3 pb-6 group hover:bg-neutral-100 cursor-pointer"
    >
           <div 
            className="
                relative
                aspect-square
                w-28
                h-28
                overflow-hidden
            "
           >
      <Image
        className="object-cover"
        src={imagePath}
        alt={episode.title}
        fill
      />
        <PlayButton 
        onClick={() => onPlay(episode.id)}
        className="backdrop-blur-lg backdrop-brightness-200 bg-transparent translate-x-8 group-hover:translate-y-9 translate-y-12"/>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{episode.title}</h3>
        <p className="text-gray-500 overflow-y-hidden h-[50px]">{episode.description}</p>
        <div className="flex flex-row items-baseline gap-x-2">
        <p className="text-gray-500">
        {convertDuration(episode.duration)}
        </p>
        </div>
      </div>
    </Link>
  );
};

export default EpisodeItem;
