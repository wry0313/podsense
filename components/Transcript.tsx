import SeekButton from "./seekButton";
import CopyLinkButtons from "./CopyLInkButtons";
import { open_sans } from "@/app/fonts";

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
    <div className={open_sans.className + " md:px-10"}>
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
                <CopyLinkButtons text={item.text} start={item.start} episode_id={episode_id} />
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
