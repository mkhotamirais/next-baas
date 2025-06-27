import GlobalFooter from "@/layouts/GlobalFooter";
import GlobalNavMobile from "@/layouts/GlobalNavMobile";
import React from "react";
import c from "@/lib/firebase/content.json";
import UserFirebaseProvider from "@/layouts/UserFirebaseProvider";
import Logo from "@/components/Logo";
import LogoFirebase from "@/components/LogoFirebase";
import GlobalNavDesktop from "@/layouts/GlobalNavDesktop";
import NavUserFirebase from "@/app/firebase/NavUserFirebase";

export default function FirebaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserFirebaseProvider>
      <header className="header">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              <Logo />
              <LogoFirebase />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GlobalNavDesktop menu={c.main_menu} />
            <NavUserFirebase />
            <GlobalNavMobile logo={<LogoFirebase />} menu={c.main_menu} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </UserFirebaseProvider>
  );
}
