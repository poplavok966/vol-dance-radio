import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {children}
      <SiteFooter />
    </div>
  );
}
