import usePlayer from "./usePlayer";


const useOnPlay = () => {
    const player = usePlayer();

    const onPlay = (id:string) => {
        player.setId(id);
    }

    return onPlay;
}

export default useOnPlay