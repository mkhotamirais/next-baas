"use client";

import Pending from "@/components/Pending";
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

  if (!isMounted || !user) return <Pending />;

  return <>{children}</>;
}
