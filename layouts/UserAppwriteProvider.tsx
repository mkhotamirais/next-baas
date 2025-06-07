"use client";

import { account } from "@/config/appwrite";
import { useAppwriteStore } from "@/lib/appwrite/store";
import { useGlobalStore } from "@/lib/globalStore";
import { useEffect } from "react";

export default function UserAppwriteProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAppwriteStore();
  const { isMounted, setIsMounted } = useGlobalStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setIsMounted(true);
      }
    };
    fetchUser();
  }, [setUser, setIsMounted]);

  if (!isMounted) return null;
  return <>{children}</>;
}
