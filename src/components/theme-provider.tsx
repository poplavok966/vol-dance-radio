import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";
type Mode = "auto" | Theme;

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

const KEY = "vd_theme";
const KYIV = "Europe/Kyiv";
const SUN_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=49.53&longitude=26.18&daily=sunrise,sunset&timezone=Europe/Kyiv";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f4efe6" : "#0c0c10");
}

function readMode(): Mode {
  const saved = localStorage.getItem(KEY);
  if (saved === "light" || saved === "dark" || saved === "auto") return saved;
  return "auto";
}

function kyivHour(now = new Date()) {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: KYIV,
    hour: "numeric",
    hour12: false,
  }).format(now);
  return Number(hour);
}

function isNight(sunrise?: Date, sunset?: Date) {
  const now = new Date();
  if (sunrise && sunset) return now >= sunset || now < sunrise;
  const hour = kyivHour(now);
  return hour >= 20 || hour < 7;
}

function osDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveTheme(mode: Mode, sunrise?: Date, sunset?: Date): Theme {
  if (mode === "light" || mode === "dark") return mode;
  return osDark() || isNight(sunrise, sunset) ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let sunrise: Date | undefined;
    let sunset: Date | undefined;
    let mode = readMode();

    const sync = () => {
      const next = resolveTheme(mode, sunrise, sunset);
      setTheme(next);
      applyTheme(next);
    };

    sync();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      if (readMode() === "auto") sync();
    };
    media.addEventListener("change", onScheme);

    const tick = window.setInterval(() => {
      if (readMode() === "auto") sync();
    }, 60_000);

    void fetch(SUN_URL)
      .then((r) => r.json())
      .then((d) => {
        const up = d?.daily?.sunrise?.[0];
        const down = d?.daily?.sunset?.[0];
        if (up) sunrise = new Date(up);
        if (down) sunset = new Date(down);
        if (readMode() === "auto") sync();
      })
      .catch(() => {});

    return () => {
      media.removeEventListener("change", onScheme);
      window.clearInterval(tick);
    };
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      applyTheme(next);
      return next;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
