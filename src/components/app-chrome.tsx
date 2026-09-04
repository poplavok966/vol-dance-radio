import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { PlayerBar } from "./player-bar";
import { CookieNotice } from "./cookie-notice";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <div className="vd-page min-h-screen pb-28">
      <SiteHeader />
      {children}
      <PlayerBar />
      <CookieNotice />
    </div>
  );
}
