
import Image from "next/image";

import LibraryContent from "@/components/Library";


const Library = () => {

//   const {user, isLoadingUser} = useUser();
//   const auth = useAuthModal();
//   const router = useRouter();
//   useEffect(() => {
    
//     if (!isLoadingUser && !user) {
//       auth.onOpen();
//       router.replace("/");
//     }
// }, [user, isLoadingUser, router]);


  return (
    
    <div className="h-full w-full overflow-hidden overflow-y-auto dark:bg-dark-default">
      <div className="px-10 mb-5">
        <div className="flex flex-col md:flex-row items-center gap-x-5" >
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <Image
              fill
              sizes="(min-width: 1024px) 176px, 128px"
              src="/images/podcast.png"
              alt="Podcast library icon"
              className="object-cover shadow-md rounded-full"
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-4 md:mt-4">
            <p className="hidden md:block font-semibold text-sm">Library</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              Liked Podcasts
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] pl-10">
      <LibraryContent showLiked={true} channelName="library page" />
      </div>
    </div>
  );

};

export default Library;
