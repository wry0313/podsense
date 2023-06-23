"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Podcast } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MiniPodcastItemProps {
  podcast: Podcast;
}

const MiniPodcastItemProps = ({ podcast }: MiniPodcastItemProps) => {
  const imageUrl = useLoadImage(podcast);

  return (
    <Link
      href={`/podcast/${podcast.id}`}
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
        <p className="font-semibold truncate w-full">{podcast.title}</p>
        <p className="text-neutral-400 text-sm w-full truncate">
          By {podcast.host}
        </p>
      </div>
    </Link>
  );
};

export default MiniPodcastItemProps;
