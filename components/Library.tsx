"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Podcast } from "@/types";

import MiniPodcastItem from "./MiniPodcastItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";

interface LibraryProps {
  podcasts: Podcast[];
}
const Library = ({ podcasts }: LibraryProps) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const { user } = useUser();

  const pathname = usePathname();


  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };
  return (
    <div className="h-full flex flex-col">
      <div
        className="


             w-[300px]
            "
      >
        {/* <div className="
        items-center 
        gap-x-4
        flex
        flex-row
        text-neutral-400 
        hover:text-black 
        w-full
        py-1
        pl-1
        hover:bg-neutral-400/5
        rounded-md
        transition 
        cursor-pointer">
          <TbPlaylist size={30} />
          <Link
            className="
                    font-medium
                    text-md
                    w-full
                    "
            href="/liked"
          >
            Library
          </Link>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
                    text-neutral-400
                    cursor-pointer
                    hover:text-black
                    transition
                    hover:bg-neutral-100
                    rounded-full
                    "
        />*/}
        <SidebarItem icon={TbPlaylist} label={"Library"} href={"/liked"} active={pathname == '/liked'}/>
      </div> 

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
          <MiniPodcastItem podcast={podcast} key={podcast.id} />
        ))}
      </div>
    </div>
  );
};

export default Library;
