import Image from "next/image";
import { Episode } from "@/types";
import PlayButton from "./PlayButton";
import Link from "next/link";

interface EpisodeItemProps {
  episode: Episode;
}

function convertSecondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  let result = "";
  if (hours > 0) {
    result += hours + " hr ";
  }
  if (minutes > 0) {
    result += minutes + " min ";
  }
  if (hours === 0 && minutes === 0) {
    result += remainingSeconds + " sec";
  }
  return result.trim();
}

const EpisodeItem = ({ episode }: EpisodeItemProps) => {
  return (
    <Link
      href={"/episode/" + episode.id}
      className="flex items-start gap-x-4 border-t-2 pt-3 pb-6 group hover:bg-neutral-100 cursor-pointer max-w-[1200px]"
    >

       

      <div
        className="
                relative
                aspect-square
                min-w-[112px]
                ml-4
            "
      >
        <PlayButton 
        className="
        mt-[-52px]
        translate-x-8
        translate-y-24
        group-hover:translate-y-20
        "
        episode={episode}/>

        <Image
          className="rounded-md"
          src={episode.image_url}
          alt={episode.title}
          width={112}
          height={112}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{episode.title}</h3>
        <p className="text-gray-500 overflow-hidden h-[50px]">
          {episode.description.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, "")}
        </p>
        <div className="flex flex-row items-baseline gap-x-2 text-sm mt-1">
          <p className="text-gray-500">
            {convertSecondsToTime(episode.duration)}
          </p>
          <p className="text-gray-500">{episode.released_date}</p>
          {episode.processed && (
            <p className="bg-neutral-50 rounded-md shadow-sm text-sm w-fit p-1 text-green-600">
              ✅ chatbot available
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EpisodeItem;
