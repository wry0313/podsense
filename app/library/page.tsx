import Image from "next/image";
import getLikedPodcasts from "@/actions/getLikdPodcasts";
import LikedContent from "./components/LikedContent";


const Library = async () => {
  const podcasts = await getLikedPodcasts();

  return (
    <div
      className="
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        "
    >
      <div className="px-6 mb-5">
        <div
          className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        gap-x-5
                    "
        >
          <div
            className="
                            relative
                            h-32
                            w-32
                            lg:h-44
                            lg:w-44
                            "
          >
            <Image
              fill
              src="/images/podcast.png"
              alt="Podcast library icon"
              className="object-cover shadow-md rounded-full"
            />
          </div>
          <div
            className="
                                flex 
                                flex-col
                                gap-y-2
                                mt-4
                                md:mt-4
                            "
          >
            <p className="hidden md:block font-semibold text-sm">Library</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              Liked Podcasts
            </h1>
          </div>
        </div>
      </div>

      <LikedContent podcasts={podcasts} />
    </div>
  );
};

export default Library;
