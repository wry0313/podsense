import getPodcasts from "@/actions/getPodcasts";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";


export const revalidate = 0; // this means the page will be regenerated on every request & not be cached

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
      <Header>
        <div className="mb-2">
          <h1 className=" text-black text-3xl font-semibold">Welcome Back</h1>
          <div
            className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
          "
          >
            <ListItem
              image="/images/liked.png"
              name="Podcasts Library"
              href="liked"
            />
            <ListItem
              image="/images/liked.png"
              name="Episode Queue"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-10 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl font-semibold">Discover New Podcasts</h1>
        </div>
        <PageContent podcasts={podcasts}/>
      </div>
    </div>
  );
}