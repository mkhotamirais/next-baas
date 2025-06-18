"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useFirebaseStore } from "@/lib/firebase/store";
import c from "@/lib/firebase/content.json";
import Sheet2 from "@/components/ui/Sheet2";

export default function NavUserFirebase() {
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
        <Sheet2 name={user.displayName || "USER"} menu={c.user_menu} logout={logout} />
      ) : (
        <Link href="/firebase/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
