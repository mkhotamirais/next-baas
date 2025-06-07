import { create } from "zustand";

interface GlobalState {
  isMounted: boolean;
  setIsMounted: (isMounted: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isMounted: false,
  setIsMounted: (isMounted) => set({ isMounted }),
}));
