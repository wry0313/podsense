"use client"
import { TbPlaylist } from "react-icons/tb";
// import { AiOutlinePlus } from "react-icons/ai";

// import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";
// import useUploadModal from "@/hooks/useUploadModal";
import { Podcast } from "@/types";
import getLikdPodcasts from "@/actions/getLikdPodcasts";

import SidebarItem from "./SidebarItem";
import MediaItem from "./MediaItem";
// import getLikdPodcasts from "@/actions/getLikdPodcasts";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useEffect, useState } from 'react'
import { Database } from "@/types_db";


interface LibraryProps {
  pathname: string
}
const Library = async ({ pathname }: LibraryProps) => {
  // const [likedPodcasts, setLikedPocasts] = useState<Podcast[]>([])
  // const supabase = createClientComponentClient()

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await supabase
  //     .from('liked_podcasts')
  //     .select('*, podcasts(*)')
  //     .order('created_at', { ascending: false });
    
  //     const podcastList = data?.map((item) => item.podcasts)
  //     console.log(podcastList)
  //     setLikedPocasts(podcastList!)
  //   }

  //   getData()
  // }, [])

  // const authModal = useAuthModal();
  // const uploadModal = useUploadModal();

  // const { user } = useUser();
  // const userPodcasts = await getLikdPodcasts();
  // console.log(userPodcasts)

  // const onClick = () => {
  //   if (!user) {
  //     return authModal.onOpen();
  //   }
    // return uploadModal.onOpen();
  // };
  return (
    <div className="h-full flex flex-col">
    
        {/* <SidebarItem icon={AiOutlinePlus} label={"Upload"} onClick={onClick} href={pathname} /> */}

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
        {/* {likedPodcasts.map((podcast) => (
          <MediaItem data={podcast} key={podcast.id} active={pathname=='/podcast/'+podcast.id}/>
        ))} */}

      </div>
    </div>
  );
};

export default Library;
