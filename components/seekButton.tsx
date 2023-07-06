"use client"

import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";

const SeekButton = ({ seekTime, episode_id, podcast_id } : { seekTime: number, episode_id : string, podcast_id: string}) => {
    const player = usePlayer();
    const onPlay = useOnPlay();
    const handleClick = () => {
        if (player.activeId !== episode_id) {
            onPlay(episode_id, podcast_id);
            player.setNeedSet(true);
            player.setNeedSetTime(seekTime);
        } else {
            player.audioRef!.current!.currentTime = seekTime;
            player.audioRef!.current!.play();
            player.setPlaying(true);
        }
    }
    return ( 
        <button onClick={handleClick}>
            Seek
        </button>
     );
}
 
export default SeekButton;