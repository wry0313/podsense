import getPodcasts from "@/actions/getPodcasts";
import PodcastItem from "@/components/PodcastItem";

export default async function Home() {
  const podcasts = await getPodcasts();
  return (
    <>

        <h1 className="mt-2 text-3xl">Discover New Podcasts</h1>

      <div
        className="
        grid 
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4 
        mt-4
      "
      >
        {podcasts.map((podcast) => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </>
  );
}
