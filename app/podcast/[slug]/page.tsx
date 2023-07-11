import getPodcastById from "@/actions/getPodcastById";
import LikeButtonWithText from "@/components/LikeButtonWithText";
import PageContent from "./component/PageContent";
import getPodcastTagsByPodcastId from "@/actions/getPodcastTagsByPodcastId";
import Image from "next/image";
import ExpandTextBlock from "@/components/ExpandTextBlock";
import getEpisodesByRange from "@/actions/getEpisodesByRange";
import ChatWIndowPodcast from "@/components/ChatWindowPodcast";

// export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  const podcast_id = params.slug;
  const podcastData = getPodcastById(podcast_id);
  const tagsData = getPodcastTagsByPodcastId(podcast_id);
  const PAGE_COUNT = 50;
  const episodesDescData = getEpisodesByRange(podcast_id, PAGE_COUNT, false);
  const episodeAscData = getEpisodesByRange(podcast_id, PAGE_COUNT, true);
  const [podcast, tags, episodesDesc, episodesAsc] = await Promise.all([
    podcastData,
    tagsData,
    episodesDescData,
    episodeAscData,
  ]);

  if (!podcast || !podcast.id) {
    return (
      <h1
        className="
      font-bold
    text-5xl
    "
      >
        This podcast doesn&apos;t exist... 😣
      </h1>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-top gap-x-5">
        <div className="relative h-32 w-32 lg:h-56 lg:w-56 shadow-lg flex-none">
          <Image
            src={podcast.image_url!}
            alt="Podcast cover image"
            className="object-cover rounded-md"
            fill
            sizes="(min-width: 1024px) 224px, 128px"
          />
        </div>
        <div className="flex flex-col gap-y-3 md:mt-0">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
            {podcast.title}
          </h1>
          <p className="text-xl font-semibold">{podcast.host}</p>
          <div className="flex flex-row gap-2 overflow-x-auto flex-wrap">
            {tags.map((tag) => (
              <div
                key={tag.tag}
                className="bg-neutral-100 dark:bg-dark-100 rounded-md p-1 w-fit cursor-pointer text-sm font-semibold h-fit"
              >
                {tag.tag}
              </div>
            ))}
          </div>
          <LikeButtonWithText podcast_id={podcast_id} />
        </div>
      </div>

      <div className="mt-2">
        <h1 className="font-semibold text-2xl">About</h1>
        <ExpandTextBlock htmlText={podcast.description!} />
      </div>
      <h1 className="font-semibold text-3xl my-5">{podcast.host} AI</h1>
      <ChatWIndowPodcast podcast={podcast} />
      <PageContent
        podcast_id={podcast_id}
        episodesDesc={episodesDesc}
        episodesAsc={episodesAsc}
        pageCount={PAGE_COUNT}
      />
    </>
  );
}
