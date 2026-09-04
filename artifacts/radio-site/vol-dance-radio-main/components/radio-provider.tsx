'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import useSWR from 'swr'

export const STREAM_URL = 'https://globalic.stream:1185/stream'
const STATUS_URL = 'https://globalic.stream:1185/status-json.xsl'
const DEFAULT_TITLE = 'VOL DANCE — On Air'

type Stats = {
  title: string
  listeners: number
  peak: number
}

export type HistoryItem = {
  title: string
  time: string
}

type RadioContextValue = {
  isPlaying: boolean
  isBuffering: boolean
  volume: number
  muted: boolean
  trackName: string
  listeners: number
  peak: number
  history: HistoryItem[]
  toggle: () => Promise<void>
  setVolume: (v: number) => void
  toggleMute: () => void
}

const RadioContext = createContext<RadioContextValue | null>(null)

async function statsFetcher(): Promise<Stats> {
  const res = await fetch(`${STATUS_URL}?_=${Date.now()}`, { cache: 'no-cache' })
  const data = await res.json()
  let source = data?.icestats?.source
  if (Array.isArray(source)) {
    source =
      source.find(
        (s: { listenurl?: string }) =>
          s.listenurl && s.listenurl.includes('/stream'),
      ) ?? source[0]
  }
  return {
    title: source?.title || DEFAULT_TITLE,
    listeners: Number(source?.listeners ?? 0),
    peak: Number(source?.listener_peak ?? 0),
  }
}

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [volume, setVolumeState] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const lastTitleRef = useRef<string>('')

  // Live stream statistics (title, listeners, peak) polled every 10s.
  const { data: stats } = useSWR('stream-stats', statsFetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  // Build a rolling history whenever the on-air title changes.
  useEffect(() => {
    const title = stats?.title
    if (!title || title === DEFAULT_TITLE) return
    if (title === lastTitleRef.current) return
    lastTitleRef.current = title
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes(),
    ).padStart(2, '0')}`
    setHistory((prev) => [{ title, time }, ...prev].slice(0, 5))
  }, [stats?.title])

  // Create the audio element once on the client.
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'auto'
    audio.volume = volume
    audioRef.current = audio

    const onPlaying = () => setIsBuffering(false)
    const onWaiting = () => setIsBuffering(true)
    const onEnded = () => setIsPlaying(false)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
      audio.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    // Unlock/resume AudioContext for mobile browsers.
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      if (Ctx) audioCtxRef.current = new Ctx()
    }
    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume()
    }

    if (!isPlaying) {
      setIsBuffering(true)
      audio.src = `${STREAM_URL}?t=${Date.now()}`
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsBuffering(false)
        // Some mobile browsers require a second tap to start playback.
      }
    } else {
      audio.pause()
      audio.src = ''
      setIsPlaying(false)
      setIsBuffering(false)
    }
  }, [isPlaying])

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v))
    setVolumeState(clamped)
    setMuted(clamped === 0)
    if (audioRef.current) audioRef.current.volume = clamped
  }, [])

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume
      }
      return next
    })
  }, [volume])

  const value = useMemo<RadioContextValue>(
    () => ({
      isPlaying,
      isBuffering,
      volume: muted ? 0 : volume,
      muted,
      trackName: stats?.title ?? DEFAULT_TITLE,
      listeners: stats?.listeners ?? 0,
      peak: stats?.peak ?? 0,
      history,
      toggle,
      setVolume,
      toggleMute,
    }),
    [
      isPlaying,
      isBuffering,
      volume,
      muted,
      stats,
      history,
      toggle,
      setVolume,
      toggleMute,
    ],
  )

  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>
}

export function useRadio() {
  const ctx = useContext(RadioContext)
  if (!ctx) throw new Error('useRadio must be used within RadioProvider')
  return ctx
}
