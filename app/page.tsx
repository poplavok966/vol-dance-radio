import { RadioProvider } from '@/components/radio-provider'
import { RequestProvider } from '@/components/request-modal'
import { ResidentProvider } from '@/components/resident-modal'
import { SiteHeader } from '@/components/site-header'
import { NowPlaying } from '@/components/now-playing'
import { MyTunerPlaylist } from '@/components/mytuner-playlist'
import { StatsPanel } from '@/components/stats-panel'
import { ChatPanel } from '@/components/chat-panel'
import { PlayerBar } from '@/components/player-bar'
import { Particles } from '@/components/particles'

export default function Page() {
  return (
    <RadioProvider>
      <RequestProvider>
        <ResidentProvider>
        <div className="ambient-bg relative flex min-h-screen flex-col pb-[84px]">
          <Particles />

          <div className="relative z-10 flex flex-1 flex-col">
            <SiteHeader />

            <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-5 py-8 md:px-8 md:py-10">
              <NowPlaying />
              <MyTunerPlaylist />
              <div className="grid gap-6 lg:grid-cols-2">
                <StatsPanel />
                <ChatPanel />
              </div>
            </main>
          </div>

          <PlayerBar />
        </div>
        </ResidentProvider>
      </RequestProvider>
    </RadioProvider>
  )
}
