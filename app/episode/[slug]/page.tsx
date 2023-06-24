import ImageWrapper from "@/components/ImageWrapper";
import getEpisodeByEpisodeId from "@/actions/getEpisodeByEpisodeId";
import PageContent from "./component/PageContent";

// TODO: for generate static page: you can use suapabase admin: https://nesin.io/blog/check-if-file-exists-supabase-storage

export default async function Page({ params }: { params: { slug: string } }) {
  const episode_id = params.slug;

  const episode = await getEpisodeByEpisodeId(episode_id);

  if (!episode.id) {
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
        This episode doesn't exist... 😭
      </div>
    );
  }

  return (
    <div className="px-6 bg-white rounded-lg  w-full overflow-hidden overflow-y-auto h-[calc(100%-96px-90px)]">
      <div className="flex flex-col border-b-2">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-56 lg:w-56 shadow-2xl flex-none">
            <ImageWrapper data={episode} />
          </div>

          <div className="flex flex-col gap-y-2 mt-4 md:mt-4">
            <p className="hidden md:block font-semibold text-sm">episode</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {episode.title}
            </h1>
            <p className="text-xl font-semibold">{episode.host}</p>
          </div>
        </div>

        <div className="mt-8">
        </div>

        <p className="font-semibold text-2xl mt-3">Episode Description</p>
        <div
          className="
            mt-4
            pb-4
            max-w-[50%]
          "
        >
          {episode.description}
        </div>
      </div>

      <PageContent episode={episode} />
    </div>
  );
}
