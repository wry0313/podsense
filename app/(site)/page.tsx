import getPodcasts from "@/actions/getPodcasts";
import PodcastItem from "@/components/PodcastItem";

export default async function Home() {
  const podcasts = await getPodcasts();
  console.log("render")
  return (
    <div
      className="
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    bg-white
    "
    >
      <div className="mt-2 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl font-semibold">Discover New Podcasts</h1>
        </div>
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
        <PodcastItem
          key={podcast.id} 
          podcast={podcast}
        />
      ))}
    </div>
      </div>
    </div>
  );
}
