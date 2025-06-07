"use client";

import Loading from "@/components/Loading";
import { useAppwriteStore } from "@/lib/appwrite/store";
import { useGlobalStore } from "@/lib/globalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAppwriteStore();
  const { isMounted } = useGlobalStore();

  useEffect(() => {
    if (isMounted && !user) {
      router.replace("/appwrite");
    }
  }, [isMounted, user, router]);

  if (user) return <>{children}</>;

  return <Loading />;
}
