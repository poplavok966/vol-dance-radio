import { RadioProvider } from '@/components/radio-provider'
import { RequestProvider } from '@/components/request-modal'
import { ResidentProvider } from '@/components/resident-modal'
import { SiteHeader } from '@/components/site-header'
import { NowPlaying } from '@/components/now-playing'
import { GenreRibbon } from '@/components/genre-ribbon'
import { MyTunerPlaylist } from '@/components/mytuner-playlist'
import { StatsPanel } from '@/components/stats-panel'
import { ChatPanel } from '@/components/chat-panel'
import { ResidentsSection } from '@/components/residents-section'
import { PlayerBar } from '@/components/player-bar'
import { Particles } from '@/components/particles'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <RadioProvider>
      <RequestProvider>
        <ResidentProvider>
          <div className="ambient-bg relative flex min-h-screen flex-col pb-[84px]">
            <Particles />
            <div className="vd-grid pointer-events-none absolute inset-0 z-0" />

            <div className="relative z-10 flex flex-1 flex-col">
              <SiteHeader />

              <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-5 py-8 md:px-8 md:py-12">
                <NowPlaying />
                <GenreRibbon />
                <div id="history">
                  <MyTunerPlaylist />
                </div>
                <ResidentsSection />
                <div className="grid gap-6 lg:grid-cols-2">
                  <StatsPanel />
                  <ChatPanel />
                </div>
                <SiteFooter />
              </main>
            </div>

            <PlayerBar />
          </div>
        </ResidentProvider>
      </RequestProvider>
    </RadioProvider>
  )
}
