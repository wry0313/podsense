"use client"

import { Podcast } from "@/types";
import MediaItem from "./MediaItem";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

interface LibraryProps {
  pathname: string
}
const Library = ({ pathname }: LibraryProps) => {
  const [likedPodcasts, setLikedPocasts] = useState<Podcast[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
      .from('liked_podcasts')
      .select('*, podcasts(*)')
      .order('created_at', { ascending: false });
  
      const podcastList = data?.map((item) => item.podcasts)
      setLikedPocasts(podcastList!)
    }

    getData()
  }, [])

  return (
      <div className=" flex flex-col gap-y-2 mt-4 px-3 h-full overflow-y-auto">
        {likedPodcasts.map((podcast) => (
          <MediaItem data={podcast} key={podcast.id} active={pathname=='/podcast/'+podcast.id}/>
        ))}
      </div>
  );
};

export default Library;
