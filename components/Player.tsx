"use client"

import useGetEpisodeById from "@/hooks/useGetEpisodeById";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { episode } = useGetEpisodeById(player.activeId);

    const episodeUrl = episode?.audio_url;

    if (!episode || !player.activeId) {
        return null;
    }

    // problem we have a client component and hook but all the ways we fetch song is with server components
    // great thing with supabase: we can avoid server client but we dont have to do that

    return ( <div className="
        fixed
        bottom-0
        bg-neutral-100
        w-full
        py-2
        h-[80px]
        px-4
    ">
        <PlayerContent 
            episode={episode}
            episodeUrl={episodeUrl!}
            key={episodeUrl} // key attribute, whenever it changes it will completely destroy the element and re-render a new one
            // we need key because we want to have a playlist and we want to allow the user to step the song
            // we wannna ensure that player component is completely destroyed and before we load the new song
            
            />
    </div> );
}
 
export default Player;