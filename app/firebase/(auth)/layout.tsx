"use client";

import Loading from "@/components/Loading";
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

  if (!user) return <>{children}</>;

  return <Loading />;
}
