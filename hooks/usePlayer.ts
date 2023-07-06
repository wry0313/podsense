import { RefObject } from "react";
import { create } from "zustand";

interface PlayerStore {
    activeId?: string;
    loaded?: boolean;
    audioRef?: RefObject<HTMLAudioElement>
    playing?: boolean;
    needSet?: boolean
    needSetTime?: number
    podcast_id?: string;
    setPodcastId: (id: string) => void;
    setPlaying: (playing: boolean) => void;
    setAudioRef: (ref: RefObject<HTMLAudioElement>) => void;
    setNeedSet: (needSet: boolean) => void;
    setNeedSetTime: (time: number) => void;
    setId: (id: string) => void;
    setLoaded: (loaded: boolean) => void;
};

const usePlayer = create<PlayerStore>((set) => ({
    activeId: undefined,
    loaded: false,
    audiRef: undefined,
    playing: false,
    needSet: false,
    needSetTime: 0,
    podcast_id: undefined,
    setPodcastId: (id: string) => set({ podcast_id: id }),
    setPlaying: (playing: boolean) => set({ playing: playing }),
    setNeedSet: (needSet: boolean) => set({ needSet: needSet }),
    setNeedSetTime: (time: number) => set({ needSetTime: time }),
    setAudioRef: (ref: RefObject<HTMLAudioElement>) => set({ audioRef: ref }),
    setId: (id: string) => set({ activeId: id }),
    setLoaded: (loaded: boolean) => set({ loaded: loaded }),
}))

export default usePlayer;