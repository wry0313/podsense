import { create } from 'zustand';

interface SidebarState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const useSidebar = create<SidebarState>((set) => ({
    isOpen: true,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useSidebar;
