import GlobalFooter from "@/layouts/GlobalFooter";
import GlobalNavMobile from "@/layouts/GlobalNavMobile";
import React from "react";
import c from "@/lib/firebase/content.json";

export default function FirebaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div>Logo</div>
          <GlobalNavMobile logo={<div>logo</div>} menu={c.main_menu} />
          <nav></nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </>
  );
}
