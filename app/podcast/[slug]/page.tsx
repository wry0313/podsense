import Image from "next/image";

import Header from "@/components/Header";
import ImageWrapper from "../components/ImageWrapper";
import getPodcastById from "@/actions/getPodcastById";
import getEpisodeByTitle from "@/actions/getEpisodesById";

// TODO: for generate static page: you can use suapabase admin: https://nesin.io/blog/check-if-file-exists-supabase-storage

export default async function Page({ params }: { params: { slug: string } }) {
  const podcast_id = params.slug;

  // TODO: this can be optimized by concurrent fetching
  const podcast = await getPodcastById(podcast_id);
  const episodes = await getEpisodeByTitle(podcast.title);

  console.log(episodes);

  if (!podcast) {
    return <div>This podcast doesn't exist.</div>;
  }

  return (
    <div className="bg-white rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header/>

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

        efeijf
      </div>
    </div>
  );
}
