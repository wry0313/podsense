import getPodcastsByTitle from "@/actions/getPodcastsByTitle";
import getEpisodesByTitle from "@/actions/getEpisodesByTitle";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { memo } from "react";

const MemoMeidaItem = memo(MediaItem);

async function fetchPodcasts(title: string) {
    return await getPodcastsByTitle(title)
}

async function fetchEpisodes(title: string) {
    return await getEpisodesByTitle(title)
}

const SearchContentWrapper = async ({
    title
}:{
    title: string
}) => {
    const podcastsData = fetchPodcasts(title)
    const episodeData = fetchEpisodes(title)

    const [podcasts, episodes] = await Promise.all([podcastsData, episodeData])
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
                  <MediaItem data={podcast} isPodcast={true} highlightPhrase={title}/>
                </div>
                <LikeButton podcast_id={podcast.id} />
              </div>
            ))}
          </div>
        )}
        {episodes.length > 0 && (
          <div className="flex flex-row gap-x-2 text-sm mt-10 items-center">
            <div className="text-xl font-bold">Episodes</div>
            {episodes.length} episodes found
          </div>
        )}
        <div className="flex flex-col gap-y-2 w-full h-fit">
          {episodes.map((episode, i) => (
            <div key={i} className="flex items-center gap-x-4 w-full">
              <div className="flex-1">
                <MemoMeidaItem data={episode} isPodcast={false} showProcess={true} highlightPhrase={title} />
              </div>
            </div>
          ))}
        </div>
      </div>
     );
}
 
export default SearchContentWrapper;