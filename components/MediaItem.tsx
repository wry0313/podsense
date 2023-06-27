"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Episode, Podcast } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface MediaItemProps {
  data: Podcast | Episode;
  isPodcast?: boolean;
  active?: boolean;
}

const MediaItem = ({
  data,
  isPodcast = true,
  active = false,
}: MediaItemProps) => {
  const imageUrl = useLoadImage(data);
  const link = isPodcast ? `/podcast/${data.id}` : `/episode/${data.id}`;

  return (
    <Link
      href={link}
      className={twMerge(
        `
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-400/10
        w-full
        p-2
        rounded-md
            `,
        active && "bg-neutral-400/10"
      )}
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
          src={imageUrl}
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
