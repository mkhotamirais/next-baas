"use client";

import { account } from "@/config/appwrite";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppwriteStore } from "@/lib/appwrite/store";
import c from "@/lib/appwrite/content.json";
import { useGlobalStore } from "@/lib/globalStore";
import Sheet2 from "@/components/ui/Sheet2";

export default function NavUserAppwrite() {
  const { user, setUser } = useAppwriteStore();
  const { isMounted } = useGlobalStore();
  const router = useRouter();

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/appwrite");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      {user ? (
        <Sheet2 name={user.name || "USER"} menu={c.user_menu} logout={logout} />
      ) : (
        <Link href="/appwrite/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
