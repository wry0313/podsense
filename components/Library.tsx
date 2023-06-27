"use client";
import { TbPlaylist } from "react-icons/tb";
// import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Podcast } from "@/types";

import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import MediaItem from "./MediaItem";

interface LibraryProps {
  podcasts: Podcast[];
}
const Library = ({ podcasts }: LibraryProps) => {
  const authModal = useAuthModal();
  // const uploadModal = useUploadModal();

  const { user } = useUser();

  const pathname = usePathname();
  console.log(pathname)

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // return uploadModal.onOpen();
  };
  return (
    <div className="h-full flex flex-col">
    
        {/* <SidebarItem icon={AiOutlinePlus} label={"Upload"} onClick={onClick} href={pathname} /> */}
        <SidebarItem icon={TbPlaylist} label={"Library"} href={"/library"} active={pathname == '/library'}/>

      <div
        className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
            h-full
            overflow-y-auto
            "
      >
        {podcasts.map((podcast) => (
          <MediaItem data={podcast} key={podcast.id} active={pathname=='/podcast/'+podcast.id}/>
        ))}
      </div>
    </div>
  );
};

export default Library;
