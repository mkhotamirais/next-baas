"use client";

import Pending from "@/components/Pending";
import { useFirebaseStore } from "@/lib/firebase/store";
import { useGlobalStore } from "@/lib/globalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useFirebaseStore();
  const { isMounted } = useGlobalStore();

  useEffect(() => {
    if (isMounted && user) {
      router.replace("/firebase/dashboard");
    }
  }, [isMounted, user, router]);
  if (!isMounted || user) return <Pending />;

  return <>{children}</>;
}
