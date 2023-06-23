import ImageWrapper from "../components/ImageWrapper";
import getPodcastById from "@/actions/getPodcastById";
import getEpisodeByTitle from "@/actions/getEpisodesById";

// TODO: for generate static page: you can use suapabase admin: https://nesin.io/blog/check-if-file-exists-supabase-storage

export default async function Page({ params }: { params: { slug: string } }) {
  const podcast_id = params.slug; 

  const podcastData = getPodcastById(podcast_id);
  const episodesData = getEpisodeByTitle(podcast_id);

  const [podcast, episodes] = await Promise.all([podcastData, episodesData]);
  // console.log(episodes);
  // console.log("podcast", podcast.id)
  if (!podcast.id) {
    return <div className="
    flex  
      font-bold
      text-5xl
      h-fit
      px-6
    ">This podcast doesn't exist... 😣</div>;
  }

  return (
    <div className="bg-white rounded-lg h-fit w-full overflow-hidden overflow-y-auto">
      <div className="px-6 mb-5">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <ImageWrapper podcast={podcast} />
          </div>
          <div className="flex flex-col gap-y-2 mt-4 md:mt-4">
            <p className="hidden md:block font-semibold text-sm">Library</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              {podcast.title}
            </h1>
          </div>

        </div>

        {/* using map to map out all the episodes */}
        {episodes.map((episode) => (
          <div key={episode.id} className="flex flex-row items-center mt-5">
             {episode.title}
             {episode.description}
             {episode.host}
            </div>
            )
        )}
                
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