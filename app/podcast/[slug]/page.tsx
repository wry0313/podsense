import ImageWrapper from "@/components/ImageWrapper";
import getPodcastById from "@/actions/getPodcastById";
import LikeButtonWithText from "@/components/LikeButtonWithText";
import PageContent from "./component/PageContent";
import getPodcastTagsByPodcastId from "@/actions/getPodcastTagsByPodcastId";

export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  const podcast_id = params.slug;
  const podcast = await getPodcastById(podcast_id);
  const tags = await getPodcastTagsByPodcastId(podcast_id);
  if (!podcast || !podcast.id) {
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
        This podcast doesn&apos;t exist... 😣
      </div>
    );
  }

  return (
    <div id="scroll-box" className="h-full px-6 bg-white rounded-lg w-full overflow-y-auto">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-56 lg:w-56 shadow-2xl flex-none">
            <ImageWrapper data={podcast} />
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
        <p className="font-semibold text-2xl my-3">About</p>
        <div className="flex flex-row gap-x-2 ">
          {tags.map((tag) => (
            <div className="bg-neutral-100 rounded-md p-1 w-fit cursor-pointer text-sm font-semibold">
              {tag.tag}
            </div>
          ))}
        </div>
        <div
          className="
            mt-2
          "
        >
          {podcast.description}
        </div>
      </div>

      <PageContent podcast_id={podcast_id} />

    </div>
  );
}


