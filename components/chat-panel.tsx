import { MessagesSquare } from 'lucide-react'

export function ChatPanel() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="mb-5 flex items-center gap-2 text-base font-extrabold uppercase tracking-wide">
        <MessagesSquare className="size-4 text-brand" />
        Чат ефіру
      </h2>
      <div className="h-[350px] overflow-hidden rounded-2xl border border-border bg-black">
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
