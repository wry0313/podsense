"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Podcast } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Podcast;
  onClick?: (title: string) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      onClick(data.title);
    }
    
    // TODO: Default turn on player
  };
  return (
    <div
      onClick={handleClick}
      className="
    flex
    items-center
    gap-x-3
    cursor-pointer
    hover:bg-neutral-400/10
    w-full
    p-2
    rounded-md
  "
    >
      <div
        className="
      relative
      rounded-md
      min-h-[48px]
      min-w-[48px]
      overflow-hidden
      "
      >
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm w-full truncate">
          By {data.host}
        </p>
    </div>
    </div>
  );
};

export default MediaItem;
