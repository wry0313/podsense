"use client";
import { MdOutlineContentCopy } from "react-icons/md";
import SeekButton from "./seekButton";
import { BiLink } from "react-icons/bi";

const Transcript = ({
  transcript,
  episode_id,
  podcast_id,
}: {
  transcript: object[];
  episode_id: string;
  podcast_id: string;
}) => {
  return (
    <div className="px-10">
      {transcript.map((item: any) => {
        return (
          <div
            className="mt-5 flex flex-col gap-y-1 items-start group"
            key={item?.start}
            id={item?.start}
          >
            <div className="flex flex-row justify-between w-full">
              <SeekButton
                seekTime={item?.start}
                episode_id={episode_id}
                podcast_id={podcast_id}
              />
              <div
                className="flex flex-row gap-x-2 select-none cursor-pointer text-sm font-semibold h-fit opacity-0 group-hover:opacity-100 transition"
              >
                <div
                  className="flex flex-row gap-x-1 text-neutral-500 hover:text-sky-500"
                  onClick={() => {
                    navigator.clipboard.writeText(item?.text);
                  }}
                >
                  <MdOutlineContentCopy size={16} className="relative top-[2px]" />
                  copy
                </div>

                <div 
                onClick={() => {
                  window.location.hash = item?.start;
                  navigator.clipboard.writeText("https://podsense.net/episode/"+episode_id+"#"+item?.start);
                }}
                className="flex flex-row gap-x-1 text-neutral-500 hover:text-sky-500">
                  <BiLink
                    size={19}
                  />
                  Link
                </div>
              </div>
            </div>
            <p className="text-base">{item?.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Transcript;
