"use client";

import { auth } from "@/config/firebase";
import { useFirebaseStore } from "@/lib/firebase/store";
import { useGlobalStore } from "@/lib/globalStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function UserFirebaseProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useFirebaseStore();
  const { isMounted, setIsMounted } = useGlobalStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsMounted(true);
    });

    return () => unsubscribe();
  }, [setUser, setIsMounted]);

  if (!isMounted) return null;

  return <>{children}</>;
}
