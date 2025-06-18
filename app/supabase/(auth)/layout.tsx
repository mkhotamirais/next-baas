"use client";

import { useGlobalStore } from "@/lib/globalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Pending from "@/components/Pending";
import { useSupabaseStore } from "@/lib/supabase/store";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useSupabaseStore();
  const { isMounted } = useGlobalStore();

  useEffect(() => {
    if (isMounted && user) {
      router.replace("/firebase/dashboard");
    }
  }, [isMounted, user, router]);

  if (!isMounted || user) return <Pending />;

  return <>{children}</>;
}
