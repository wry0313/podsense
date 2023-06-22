"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";


import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Podcast } from "@/types";

import MediaItem from "./MediaItem";

interface LibraryProps {
  podcasts: Podcast[]
}
const Library = ({
  podcasts
}:LibraryProps) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const { user } = useUser();
  
  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div
        className="
             flex
             items-center
             justify-between
             px-5
            "
      >
        <div className="inline-flex items-center gap-x-4 text-neutral-400 hover:text-black transition duration-200 cursor-pointer">
          <TbPlaylist  size={22} />
          <p className="
                    font-medium
                    text-md
                    "
          >
            Library
          </p>
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
        />
      </div>
      <div
        className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-5
            " // px-3
      >
        {podcasts.map((item)=> (
          <MediaItem 
            data={item}
            onClick={() => {}}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
