import GlobalFooter from "@/layouts/GlobalFooter";
import GlobalNavMobile from "@/layouts/GlobalNavMobile";
import React from "react";
import c from "@/lib/supabase/content.json";
import Logo from "@/components/Logo";
import GlobalNavDesktop from "@/layouts/GlobalNavDesktop";
import LogoSupabase from "@/components/LogoSupabase";
import UserSupabaseProvider from "@/layouts/UserSupabaseProvider";
import NavUserSupabase from "@/app/supabase/NavUserSupabase";

export default function SupabaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserSupabaseProvider>
      <header className="header">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              <Logo />
              <LogoSupabase />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GlobalNavDesktop menu={c.main_menu} />
            <NavUserSupabase />
            <GlobalNavMobile logo={<LogoSupabase />} menu={c.main_menu} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </UserSupabaseProvider>
  );
}
