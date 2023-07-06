import { RefObject } from "react";
import { create } from "zustand";

interface PlayerStore {
    activeId?: string;
    loaded?: boolean;
    audioRef?: RefObject<HTMLAudioElement>
    setAudioRef: (ref: RefObject<HTMLAudioElement>) => void;
    needSet?: boolean
    needSetTime?: number
    setNeedSet: (needSet: boolean) => void;
    setNeedSetTime: (time: number) => void;
    setId: (id: string) => void;
    setLoaded: (loaded: boolean) => void;
    reset: () => void;
};

const usePlayer = create<PlayerStore>((set) => ({
    activeId: undefined,
    loaded: false,
    audiRef: undefined,
    needSet: false,
    needSetTime: 0,
    setNeedSet: (needSet: boolean) => set({ needSet: needSet }),
    setNeedSetTime: (time: number) => set({ needSetTime: time }),
    setAudioRef: (ref: RefObject<HTMLAudioElement>) => set({ audioRef: ref }),
    setId: (id: string) => set({ activeId: id }),
    setLoaded: (loaded: boolean) => set({ loaded: loaded }),
    reset: () => set({ activeId: undefined }),
}))

export default usePlayer;