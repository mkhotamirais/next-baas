"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useFirebaseStore } from "@/lib/firebase/store";
import c from "@/lib/firebase/content.json";

export default function NavUser() {
  const { user, setUser } = useFirebaseStore();
  const router = useRouter();

  const logout = () => {
    signOut(auth);
    setUser(null);
    router.push("/firebase/login");
  };

  return (
    <div>
      {user ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <User />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-64">
            <SheetHeader>
              <SheetTitle>Hi, {user?.displayName || "USER"}</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="px-3 flex flex-col gap-2">
              {c.user_menu.map((item, i) => (
                <SheetClose asChild key={i}>
                  <Link href={item.url}>
                    <Button variant={"outline"} className="w-full justify-start">
                      {item.label}
                    </Button>
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button variant={"outline"} className="w-full justify-start" onClick={logout}>
                  Logout
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <Link href="/firebase/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
