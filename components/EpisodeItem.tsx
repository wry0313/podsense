"use client"

import Image from "next/image";
import { Episode } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";


interface EpisodeItemProps {
  episode: Episode;
}

const EpisodeItem = ({ episode }: EpisodeItemProps) => {
    const iamgePath = useLoadImage(episode)
  return (
    <div className="flex items-center gap-4 border-t-2 pt-2">
           <div 
            className="
                relative
                aspect-square
                w-24
                h-24
                overflow-hidden
            "
           >
      <Image
        className="object-cover"
        src={iamgePath}
        alt={episode.title}
        fill
      />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{episode.title}</h3>
        <p className="text-gray-500">{episode.description}</p>
      </div>
    </div>
  );
};

export default EpisodeItem;
