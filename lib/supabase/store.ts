import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface SupabaseState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useSupabaseStore = create<SupabaseState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
