import Image from "next/image";

import getLikedPodcasts from "@/actions/getLikdPodcasts";


import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const liked = async () => {
  const podcasts = await getLikedPodcasts();

  return (
    <div
      className="
        bg-white
        rounded-lg
        h-fit
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
              src="/images/liked.png"
              alt="Liked"
              className="object-cover shadow-2xl"
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

export default liked;
