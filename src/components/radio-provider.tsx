import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_TITLE, STREAM_URL } from "@/lib/constants";
import { getStreamStats } from "@/lib/radio-fn";

type RadioContextValue = {
  isPlaying: boolean;
  isBuffering: boolean;
  volume: number;
  muted: boolean;
  trackName: string;
  listeners: number;
  peak: number;
  toggle: () => Promise<void>;
  setVolume: (v: number) => void;
  toggleMute: () => void;
};

const RadioContext = createContext<RadioContextValue | null>(null);

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [trackName, setTrackName] = useState(DEFAULT_TITLE);
  const [listeners, setListeners] = useState(0);
  const [peak, setPeak] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = 0.8;
    audioRef.current = audio;
    const onPlaying = () => setIsBuffering(false);
    const onWaiting = () => setIsBuffering(true);
    const onEnded = () => {
      setIsPlaying(false);
      setIsBuffering(false);
    };
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const pull = async () => {
      try {
        const stats = await getStreamStats();
        if (!alive) return;
        setTrackName(stats.title || DEFAULT_TITLE);
        setListeners(stats.listeners);
        setPeak(stats.peak);
      } catch {
        /* keep last known */
      }
    };
    void pull();
    const id = window.setInterval(pull, 10000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) ctxRef.current = new Ctx();
    }
    if (ctxRef.current?.state === "suspended") await ctxRef.current.resume();

    if (!isPlaying) {
      setIsBuffering(true);
      audio.src = `${STREAM_URL}?t=${Date.now()}`;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsBuffering(false);
      }
    } else {
      audio.pause();
      audio.src = "";
      setIsPlaying(false);
      setIsBuffering(false);
    }
  }, [isPlaying]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    setMuted(clamped === 0);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.volume = next ? 0 : volume;
      return next;
    });
  }, [volume]);

  const value = useMemo<RadioContextValue>(
    () => ({
      isPlaying,
      isBuffering,
      volume: muted ? 0 : volume,
      muted,
      trackName,
      listeners,
      peak,
      toggle,
      setVolume,
      toggleMute,
    }),
    [isPlaying, isBuffering, volume, muted, trackName, listeners, peak, toggle, setVolume, toggleMute],
  );

  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
}

export function useRadio() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("useRadio must be used within RadioProvider");
  return ctx;
}
