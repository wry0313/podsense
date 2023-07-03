import Image from "next/image";
import getEpisodeByEpisodeId from "@/actions/getEpisodeByEpisodeId";
import PlayButton from "@/components/PlayButton";
import ChatWindow from "@/components/ChatWindow";
import ExpandTextBlock from "@/components/ExpandTextBlock";
import ScrollTopButton from "@/components/ScrollTopButton";

// export const revalidate = 0


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
    <div
      id="scroll-box"
      className="h-full px-6 bg-white dark:bg-dark-default w-full overflow-hidden overflow-y-auto "
    >
      <div className="flex flex-col">
        <div className="group flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-56 lg:w-56 flex-none">
            <Image
              src={episode.image_url}
              alt="Episode cover image"
              sizes="(min-width: 1024px) 224px, 128px"
              quality={100}
              className="object-cover rounded-lg shadow-md"
              fill
            />
            <PlayButton
              episode={episode}
              className="
              w-fit 
              p-6 
              bg-white
              lg:translate-x-[110%] 
              lg:group-hover:translate-y-[4.5rem] 
              group-hover:translate-y-[2rem] 
              lg:translate-y-24
              translate-x-[50%] 
              translate-y-12
              scale-100
              lg:scale-150
              hover:scale-110
              lg:hover:scale-[1.65]
              "
              size={20}
            />
          </div>

          <div className="flex flex-col gap-y-2 mt-4 md:mt-4">
            <p className="hidden md:block font-semibold">episode</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {episode.title}
            </h1>
            <p className="text-xl font-semibold">{episode.host}</p>
          </div>
        </div>

        <p className="font-semibold text-2xl mt-3">Episode Description</p>
        <div className="my-4">
          <ExpandTextBlock htmlText={episode.description} />
        </div>
      </div>

      <div className="mt-4 mb-10 max-w-[40rem] mx-auto ">
        {episode.transcript && <ChatWindow episode={episode} />}
      </div>

      <div className="mb-[10rem]">
        <p className="font-semibold text-2xl mt-3">Episode Transcript</p>
        {episode.transcript ? (
          <ExpandTextBlock htmlText={episode.transcript} />
        ) : (
          <p className="text-md mt-3 text-neutral-500 dark:text-dark-500">No transcript available yet.</p>
        )}
      </div>

      <ScrollTopButton />
    </div>
  );
}
