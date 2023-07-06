import usePlayer from "./usePlayer";


const useOnPlay = () => {
    const player = usePlayer();

    const onPlay = (episode_id:string, podcast_id: string) => {
        player.setId(episode_id);
        player.setPodcastId(podcast_id);
    }

    return onPlay;
}

export default useOnPlay