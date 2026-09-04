'use client'

import { useEffect, useRef, useState } from 'react'
import { History } from 'lucide-react'

// myTuner "playlist" widget. The markup below must keep the exact ids /
// classes / data-attributes the vendor script looks for, we only restyle it
// through CSS (.vd-mytuner rules in globals.css) so it matches VOL DANCE.
const WIDGET_ID = 'P8KyTcObw4YqLcOGTGNFwqp9dkpKwrNXSjnCosOSTg=='
const SCRIPT_KEY = 'playlist-v1.js'
const SCRIPT_SRC = `https://mytuner-radio.com/static/js/widgets/${SCRIPT_KEY}`

const DAYS = [
  'понеділок',
  'вівторок',
  'середа',
  'четвер',
  'пʼятниця',
  'субота',
  'неділя',
]

type MyTunerWindow = Window & {
  mytuner_scripts?: Record<string, (widgetId: string) => void>
}

let scriptPromise: Promise<void> | null = null

function loadWidgetScript() {
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    // The vendor script does `var s = window.mytuner_scripts || {}` and only
    // mutates that object, so the registry has to exist beforehand.
    const w = window as MyTunerWindow
    w.mytuner_scripts = w.mytuner_scripts ?? {}

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    )
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject())
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.head.appendChild(script)
  })

  return scriptPromise
}

export function MyTunerPlaylist() {
  const rootRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const [visible, setVisible] = useState(false)

  // Only fetch the vendor script once the widget is close to the viewport —
  // keeps the initial page load light.
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || initialized.current) return
    initialized.current = true

    let cancelled = false
    loadWidgetScript()
      .then(() => {
        if (cancelled) return
        const init = (window as MyTunerWindow).mytuner_scripts?.[SCRIPT_KEY]
        if (init) init(WIDGET_ID)
      })
      .catch(() => {
        console.log('[v0] myTuner widget script failed to load')
      })

    return () => {
      cancelled = true
    }
  }, [visible])

  // Автоматична прокрутка до останнього треку (в самий низ списку)
  useEffect(() => {
    if (!visible) return

    const timer = setInterval(() => {
      const container = document.getElementById(`${WIDGET_ID}playlist_songs`)
      if (container && container.children.length > 0) {
        container.scrollTop = container.scrollHeight
        clearInterval(timer)
      }
    }, 400)

    return () => clearInterval(timer)
  }, [visible])

  return (
    <section className="rounded-[1.6rem] border border-white/8 vd-glass p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <History className="size-4 text-blue" />
        <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-dim">
          Історія ефіру · myTuner
        </h2>
      </div>

      <div
        ref={rootRef}
        id={WIDGET_ID}
        className={`${WIDGET_ID.replace(/=/g, '')} mytuner-widget vd-mytuner`}
        data-target="520895"
        data-requires_initialization="true"
        data-fdow="0"
      >
        <a
          className="vd-mytuner-logo"
          href="https://mytuner-radio.com?utm_source=widget&utm_medium=playlist"
          rel="noopener"
          target="_blank"
        >
          <img
            src="https://mytuner-radio.com/static/icons/widgets/MyTuner_Logo/MyTunerLogo_Normal.png"
            alt="Listen on myTuner radio!"
          />
        </a>

        <a
          className="vd-mytuner-station"
          href="https://mytuner-radio.com/radio/vol-dance-520895/?utm_source=widget&utm_medium=playlist"
          rel="noopener"
          target="_blank"
        >
          <img
            src="https://static2.mytuner.mobi/media/tvos_radios/895/vol-dance.5bd9ac17.png"
            alt="Vol Dance"
          />
          <span>Vol Dance</span>
        </a>

        <ul
          id={`${WIDGET_ID}playlist-day-selector`}
          className="vd-mytuner-days"
        >
          {DAYS.map((day, i) => (
            <li key={day} className="dow" data-dow={i}>
              {day}
            </li>
          ))}
        </ul>

        <ul
          id={`${WIDGET_ID}playlist_songs`}
          className="vd-mytuner-songs vd-scroll"
          data-border="1"
          data-bordercolor="#27272a"
        />
      </div>
    </section>
  )
}
