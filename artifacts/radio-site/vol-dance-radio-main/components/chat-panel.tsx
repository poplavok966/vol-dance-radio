import { MessagesSquare } from 'lucide-react'

export function ChatPanel() {
  return (
    <div id="chat" className="rounded-[1.6rem] border border-white/8 vd-glass p-6">
      <h2 className="mb-5 flex items-center gap-2 text-base font-extrabold uppercase tracking-wide">
        <MessagesSquare className="size-4 text-brand" />
        Чат ефіру
      </h2>
      <div className="h-[350px] overflow-hidden rounded-2xl border border-white/8 bg-black">
        <iframe
          title="VOL DANCE чат"
          src="https://www5.cbox.ws/box/?boxid=964863&boxtag=SXvIg1"
          width="100%"
          height="100%"
          allow="autoplay"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  )
}
