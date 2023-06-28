import getPodcasts from "@/actions/getPodcasts";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";

export const revalidate = 0

export default async function Home() {
  const podcasts = await getPodcasts();
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
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl font-semibold">Discover New Podcasts</h1>
        </div>
        <PageContent podcasts={podcasts}/>
      </div>
    </div>
  );
}
