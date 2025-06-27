import GlobalFooter from "@/layouts/GlobalFooter";
import GlobalNavMobile from "@/layouts/GlobalNavMobile";
import React from "react";
import c from "@/lib/appwrite/content.json";
import UserAppwriteProvider from "@/layouts/UserAppwriteProvider";
import NavUserAppwrite from "@/app/appwrite/NavUserAppwrite";
import Logo from "@/components/Logo";
import LogoAppwrite from "@/components/LogoAppwrite";
import GlobalNavDesktop from "@/layouts/GlobalNavDesktop";

export default function AppwriteLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserAppwriteProvider>
      <header className="header">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              <Logo />
              <LogoAppwrite />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GlobalNavDesktop menu={c.main_menu} />
            <NavUserAppwrite />
            <GlobalNavMobile logo={<LogoAppwrite />} menu={c.main_menu} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </UserAppwriteProvider>
  );
}
