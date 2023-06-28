import Image from "next/image";
import getEpisodeByEpisodeId from "@/actions/getEpisodeByEpisodeId";
import PlayButton from "@/components/PlayButton";
import ChatWindow from "@/components/ChatWindow";
import ExpandTextBlock from "@/components/ExpandTextBlock";

// export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  const episode_id = params.slug;

  const episode = await getEpisodeByEpisodeId(episode_id);

  if (!episode || !episode.id) {
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
        This episode doesn&apos;t exist... 😭
      </div>
    );
  }

  return (
    <div className="h-full px-6 bg-white rounded-lg  w-full overflow-hidden overflow-y-auto ">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="group relative h-32 w-32 lg:h-56 lg:w-56 shadow-2xl flex-none">
          <Image
              src={episode.image_url}
              alt="Liked"
              className="object-cover rounded-md"
              fill
        />
            <PlayButton
              episode={episode}
              className="w-fit backdrop-blur-lg p-6 opacity-20 backdrop-brightness-200 bg-transparent translate-x-[120%] group-hover:translate-y-[4.5rem] translate-y-24"
            />
          </div>

          <div className="flex flex-col gap-y-2 mt-4 md:mt-4">
            <p className="hidden md:block font-semibold text-sm">episode</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {episode.title}
            </h1>
            <p className="text-xl font-semibold">{episode.host}</p>
          </div>
        </div>

        <p className="font-semibold text-2xl mt-3">Episode Description</p>
        <div className="my-4">
          <ExpandTextBlock text={episode.description} />
        </div>
      </div>

      <div className="mb-6">
        <ChatWindow episodeId={episode_id} />
      </div>
      <div className="mb-[10rem]">
        {episode.transcript && <ExpandTextBlock text={episode.transcript} />}
      </div>
    </div>
  );
}
