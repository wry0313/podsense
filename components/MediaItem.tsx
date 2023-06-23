"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Episode, Podcast } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MediaItemProps {
  data: Podcast | Episode;
  isPodcast?: boolean;
}

const MediaItem = ({ data, isPodcast = true }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);
  const link = isPodcast ? `/podcast/${data.id}` : `/episode/${data.id}`;
  return (
    <Link
      href={link}
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
          alt="Cover Image"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm w-full truncate">
          By {data.host}
        </p>
      </div>
    </Link>
  );
};

export default MediaItem;
