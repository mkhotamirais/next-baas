"use client";

import { account } from "@/config/appwrite";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { User } from "lucide-react";
import { useAppwriteStore } from "@/lib/appwrite/store";
import c from "@/lib/appwrite/content.json";
import { useGlobalStore } from "@/lib/globalStore";

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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <User />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-64 gap-2">
            <SheetHeader className="">
              <SheetTitle>Hi, {user?.name}</SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-3 space-y-1">
              {c.user_menu.map((item, i) => (
                <SheetClose asChild key={i}>
                  <Link href={item.url}>
                    <Button variant={"outline"} className="w-full !justify-start">
                      {item.label}
                    </Button>
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button onClick={logout} type="submit" className="!justify-start">
                  logout
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <Link href="/appwrite/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
