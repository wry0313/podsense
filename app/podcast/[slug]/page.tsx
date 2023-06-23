import ImageWrapper from "../components/ImageWrapper";
import getPodcastById from "@/actions/getPodcastById";
import getEpisodeByTitle from "@/actions/getEpisodesById";
import LikeButton from "@/components/LikeButton";
import LikeButtonWithText from "@/components/LikeButtonWithText";
import EpisodeItem from "@/components/EpisodeItem";

// TODO: for generate static page: you can use suapabase admin: https://nesin.io/blog/check-if-file-exists-supabase-storage

export default async function Page({ params }: { params: { slug: string } }) {
  const podcast_id = params.slug;

  const podcastData = getPodcastById(podcast_id);
  const episodesData = getEpisodeByTitle(podcast_id);

  const [podcast, episodes] = await Promise.all([podcastData, episodesData]);
  // console.log(episodes);
  // console.log("podcast", podcast.id)
  if (!podcast.id) {
    return (
      <div
        className="
    flex  
      font-bold
      text-5xl
      h-fit
      px-6
    "
      >
        This podcast doesn't exist... 😣
      </div>
    );
  }

  return (
    <div className="px-6 bg-white rounded-lg h-fit w-full overflow-hidden overflow-y-auto">
      <div className="">
        <div className="flex flex-col justify-between ">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-56 lg:w-56 shadow-2xl">
              <ImageWrapper podcast={podcast} />
            </div>

            <div className="flex flex-col gap-y-2 mt-4 md:mt-4">
              <p className="hidden md:block font-semibold text-sm">Podcast</p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                {podcast.title}
              </h1>
              <p className="text-xl font-semibold">{podcast.host}</p>
            </div>
          </div>
          <div className="mt-8">
            <LikeButtonWithText podcast_id={podcast_id} />
          </div>
          <p className="font-semibold text-2xl mt-3">About</p>
          <div
            className="
            mt-4
          "
          >
            {podcast.description}
          </div>
        </div>

        {/* using map to map out all the episodes */}
        <div className="flex flex-col gap-y-4 mt-5">
        {episodes.map((episode) => (
          <EpisodeItem key={episode.id} episode={episode} />
        ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 
 *   audio_path: string;
  cover_image_path: string;
  created_at: string;
  description: string;
  guest: string;
  host: string;
  id: string;
  podcast_id: string;
  podcast_title: string;
  released_date: string;
  title: string;
 */
