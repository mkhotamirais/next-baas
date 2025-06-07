"use client";

import { useGlobalStore } from "@/lib/globalStore";
import React, { useEffect } from "react";

export default function MountedProvider({ children }: { children: React.ReactNode }) {
  const { isMounted, setIsMounted } = useGlobalStore();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) return null;
  return <>{children}</>;
}
