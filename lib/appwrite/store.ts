import { create } from "zustand";
import { Post, User } from "./types";

interface AppwriteState {
  user: User | null;
  setUser: (user: User | null) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const useAppwriteStore = create<AppwriteState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  posts: [],
  setPosts: (posts) => set({ posts }),
}));
