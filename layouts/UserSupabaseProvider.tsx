"use client";

import { supabase } from "@/config/supabase";
import { useGlobalStore } from "@/lib/globalStore";
import { useSupabaseStore } from "@/lib/supabase/store";
import { useEffect } from "react";

export default function UserSupabaseProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useSupabaseStore();
  const { isMounted, setIsMounted } = useGlobalStore();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsMounted(true);
    });

    // Listener perubahan auth
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [setUser, setIsMounted]);

  if (!isMounted) return null;

  return <>{children}</>;
}
