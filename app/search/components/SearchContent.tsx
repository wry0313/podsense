"use client";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { Episode, Podcast } from "@/types";

const SearchContent = ({
  podcasts,
  episodes,
  query
}: {
  podcasts: Podcast[];
  episodes: Episode[];
  query: string
}) => {
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      <div className="flex flex-col text-xl font-bold">Podcasts</div>
      {podcasts.length === 0 ? (
        <div className=" text-neutral-600">No podcasts found.</div>
      ) : (
        <div className="flex flex-col gap-y-2 w-full h-fit">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="flex items-center gap-x-4 w-full">
              <div className="flex-1">
                <MediaItem data={podcast} isPodcast={true} highlightPhrase={query}/>
              </div>
              <LikeButton podcast_id={podcast.id} />
            </div>
          ))}
        </div>
      )}
      {episodes.length > 0 && (
        <div className="mt-10 text-xl font-bold">Episodes</div>
      )}
      <div className="flex flex-col gap-y-2 w-full h-fit">
        {episodes.map((episodes) => (
          <div key={episodes.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              
              <MediaItem data={episodes} isPodcast={false} showProcess={true} highlightPhrase={query} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchContent;
