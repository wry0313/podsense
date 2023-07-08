"use client";

import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

import { useEffect, useState } from "react";

import { Episode } from "@/types";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Player = () => {
  const player = usePlayer();
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);
  const supabase = createClientComponentClient();
  useEffect(() => {
    if (!player.activeId) {
      return;
    }

    const fetchEpisode = async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("title, host, audio_url, id, image_url, podcast_id")
        .eq("id", player.activeId)
        .single();    

      if (error) {
        return toast.error(error.message);
      }

      setEpisode(data as Episode);
      if (!data) {
        player.setLoaded(true); 
      }
    };

    fetchEpisode();
  }, [player.activeId, supabase, player]);  

  const episodeUrl = episode?.audio_url;

  // if we dont have an episode or we dont have an active id, we dont wanna render anything

  if (!episode || !player.activeId) {
    return null;
  }


  // problem we have a client component and hook but all the ways we fetch song is with server components
  // great thing with supabase: we can avoid server client but we dont have to do that

  return (
    <div
      className="
        fixed
        bottom-0
        bg-neutral-50
        dark:bg-dark-100
        w-full
        py-2
        h-[90px]
        px-4
        z-10
        select-none
    "
    >
      <PlayerContent
        episode={episode!}
        key={episodeUrl} // key attribute, whenever it changes it will completely destroy the element and re-render a new one
        // we need key because we want to have a playlist and we want to allow the user to step the song
        // we wannna ensure that player component is completely destroyed and before we load the new song
      />
    </div>
  );
};

export default Player;
