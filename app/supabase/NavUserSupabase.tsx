"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import c from "@/lib/supabase/content.json";
import { useSupabaseStore } from "@/lib/supabase/store";
import { supabase } from "@/config/supabase";
import Sheet2 from "@/components/ui/Sheet2";

export default function NavUserSupabase() {
  const { user, setUser } = useSupabaseStore();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/supabase/login");
  };

  return (
    <div>
      {user ? (
        <Sheet2 name={user.email || "USER"} menu={c.user_menu} logout={logout} />
      ) : (
        <Link href="/supabase/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
