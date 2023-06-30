"use client";

import { Episode, Podcast } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface MediaItemProps {
  data: Podcast | Episode;
  isPodcast: boolean;
  active?: boolean;
  showProcess?: boolean;
  highlightPhrase?: string;
}

const MediaItem = ({
  data,
  isPodcast,
  active = false,
  showProcess = false,
  highlightPhrase = "",
}: MediaItemProps) => {

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
        src={data.image_url!} 
        alt="Cover Image" 
        className="object-cover" 
        width={48}
        height={48}
        />
      </div>
      <div className="flex flex-col w-full">
        {highlightPhrase ? (
          getHighlightedText(data.title!, highlightPhrase)
        ) : (
          <p className="font-medium w-full truncate">{data.title}</p>
        )}
        <p className="text-neutral-400 text-sm w-full ">
          By {data.host}
        </p>
        {showProcess && !isPodcast && (data as Episode).processed && (
          <p className="bg-neutral-50 px-1 rounded-md shadow-sm text-sm w-fit  text-green-600">
            ✅ chatbot available
          </p>
        )}
      </div>
    </Link>
  );
};

export default MediaItem;

const getHighlightedText = (text: string, highlight: string) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <p className="font-medium truncate w-full">
      {" "}
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? <mark key={i} className="selection:bg-purple-100">{part}</mark> : part
      )}
    </p>
  );

};
