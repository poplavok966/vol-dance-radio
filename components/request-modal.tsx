'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { Music, X, Loader2, CheckCircle2 } from 'lucide-react'

type RequestContextValue = { open: () => void }
const RequestContext = createContext<RequestContextValue | null>(null)

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function RequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [track, setTrack] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const open = useCallback(() => {
    setStatus('idle')
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const send = async () => {
    if (!track.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/request-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, track }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      setName('')
      setTrack('')
      setTimeout(() => setIsOpen(false), 1400)
    } catch {
      setStatus('error')
    }
  }

  return (
    <RequestContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Замовлення треку"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-wide text-blue">
                <Music className="size-5" />
                Замовлення треку
              </h3>
              <button
                onClick={close}
                aria-label="Закрити"
                className="grid size-8 place-items-center rounded-full text-dim transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {status === 'sent' ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <CheckCircle2 className="size-12 text-blue" />
                <p className="text-sm font-semibold">
                  Дякуємо! Замовлення надіслано в ефір.
                </p>
              </div>
            ) : (
              <>
                <label
                  htmlFor="listenerName"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-dim"
                >
                  Твоє ім&apos;я або нік
                </label>
                <input
                  id="listenerName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Павло"
                  className="mb-4 w-full rounded-xl border border-border bg-black/40 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-dim focus:border-brand"
                />

                <label
                  htmlFor="trackRequestText"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-dim"
                >
                  Виконавець та назва
                </label>
                <textarea
                  id="trackRequestText"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  rows={3}
                  placeholder="Martin Garrix - Animals"
                  className="mb-2 w-full resize-none rounded-xl border border-border bg-black/40 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-dim focus:border-brand"
                />

                {status === 'error' && (
                  <p className="mb-2 text-xs font-medium text-destructive">
                    Не вдалося надіслати. Спробуйте ще раз.
                  </p>
                )}

                <div className="mt-3 flex justify-end gap-2.5">
                  <button
                    onClick={close}
                    className="rounded-lg bg-secondary px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-card-hover"
                  >
                    Скасувати
                  </button>
                  <button
                    onClick={send}
                    disabled={status === 'sending' || !track.trim()}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-2 px-4 py-2 text-xs font-bold text-white shadow-[0_4px_15px_rgba(255,85,0,0.35)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'sending' && (
                      <Loader2 className="size-3.5 animate-spin" />
                    )}
                    Надіслати
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </RequestContext.Provider>
  )
}

export function useRequestModal() {
  const ctx = useContext(RequestContext)
  if (!ctx) throw new Error('useRequestModal must be used within RequestProvider')
  return ctx
}
