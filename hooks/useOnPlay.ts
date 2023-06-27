import { Episode } from "@/types";
import usePlayer from "./usePlayer";


const useOnPlay = () => {
    const player = usePlayer();

    const onPlay = (id:string) => {

        player.setId(id);
        // player.setIds(episodes.map(episode => episode.id))
    }

    return onPlay;
}

export default useOnPlay