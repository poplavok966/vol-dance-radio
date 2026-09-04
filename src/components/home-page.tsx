import { useEffect } from "react";
import { NowPlaying } from "./now-playing";
import { GenreRibbon } from "./genre-ribbon";
import { PlaylistSection } from "./playlist-section";
import { ResidentsSection } from "./residents-section";
import { QuickActions } from "./quick-actions";
import { ChatPanel } from "./chat-panel";
import { SiteFooter } from "./site-footer";
import { scrollToHash } from "./hash-link";

export function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const id = window.setTimeout(() => scrollToHash(hash), 40);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      <NowPlaying />
      <GenreRibbon />
      <PlaylistSection />
      <ResidentsSection />
      <div className="grid gap-5 lg:grid-cols-2">
        <QuickActions />
        <ChatPanel />
      </div>
      <SiteFooter />
    </main>
  );
}
