"use client"

import usePlayer from "@/hooks/usePlayer";

const SeekButton = ({ seekTime, episode_id } : { seekTime: number, episode_id : string}) => {
    const player = usePlayer();
    const handleClick = () => {
        if (player.activeId !== episode_id) {
            player.setId(episode_id);
            player.setNeedSet(true);
            player.setNeedSetTime(seekTime);
        } else {
            player.audioRef!.current!.currentTime = seekTime;
        }
    }
    return ( 
        <button onClick={handleClick}>
            Seek
        </button>
     );
}
 
export default SeekButton;