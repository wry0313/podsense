"use client"

import { MdOutlineContentCopy } from "react-icons/md";
import { BiLink } from "react-icons/bi";

const CopyLinkButtons = ({
  text,
  start,
  episode_id,
}: {
  text: string;
  start: string;
  episode_id: string;
}) => {
  return (
    <>
      <div
        className="flex flex-row gap-x-1 text-neutral-500 hover:text-sky-500"
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
      >
        <MdOutlineContentCopy size={16} className="relative top-[2px]" />
        Copy
      </div>

      <div
        onClick={() => {
          window.location.hash = start;
          navigator.clipboard.writeText(
            "https://podsense.net/episode/" + episode_id + "#" + start
          );
        }}
        className="flex flex-row gap-x-1 text-neutral-500 hover:text-sky-500"
      >
        <BiLink size={19} />
        Link
      </div>
    </>
  );
};

export default CopyLinkButtons;
