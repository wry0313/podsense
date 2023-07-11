import Image from "next/image";
import { Episode } from "@/types";
import PlayButton from "./PlayButton";
import Link from "next/link";
import { convertSecondsToTime } from "@/utils/timeUtils";

interface EpisodeItemProps {
  episode: Episode;
}


const EpisodeItem = ({ episode }: EpisodeItemProps) => {

  const handlePlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Link
      href={"/episode/" + episode.id}
      className="flex items-start gap-x-4 border-t-2 pt-3 pb-6 dark:border-dark-200 group hover:bg-neutral-100 dark:hover:bg-dark-100 cursor-pointer  overflow-x-hidden"
    >
      <div
        className="
                relative
                aspect-square
                min-w-[112px]
                hidden sm:block
                ml-4
            "
      >
       
        <div onClick={handlePlayClick}>
        <PlayButton 
        className="
        mt-[-52px]
        translate-x-8
        translate-y-24
        group-hover:translate-y-20
        "
        episode_id={episode.id!}
        podcast_id={episode.podcast_id!}
        />
        </div>

        <Image
          className="rounded-md "
          src={episode.image_url!}
          alt={episode.title!}
          width={112}
          height={112}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold overflow-x-clip">{episode.title}</h3>
        <p className="text-neutral-500 dark:text-dark-500 overflow-clip h-[50px]">
          {episode.description?.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, "").substring(0, 250) + "..."}
        </p>
        <div className="flex flex-row items-baseline gap-x-2 text-sm mt-1">
          <p className="text-neutral-500 dark:text-dark-500">
            {convertSecondsToTime(episode.duration!)}
          </p>
          <p className="text-neutral-500 dark:text-dark-500">{episode.released_date}</p>
          {episode.processed && (
            <p className="bg-neutral-100 dark:bg-dark-100 rounded-sm text-sm font-semibold w-fit p-1 text-sky-700 dark:text-sky-300 font-mono">
             🤖 chatbot available
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EpisodeItem;
