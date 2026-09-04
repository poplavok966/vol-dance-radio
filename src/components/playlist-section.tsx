import { useEffect, useRef, useState } from "react";
import { History } from "lucide-react";
import { MYTUNER_TARGET, MYTUNER_WIDGET_ID } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "./theme-provider";

const SCRIPT_KEY = "playlist-v1.js";
const SCRIPT_SRC = `https://mytuner-radio.com/static/js/widgets/${SCRIPT_KEY}`;

type TunerWindow = Window & {
  mytuner_scripts?: Record<string, (id: string) => void>;
};

let scriptPromise: Promise<void> | null = null;

function loadScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const w = window as TunerWindow;
    w.mytuner_scripts = w.mytuner_scripts ?? {};
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      if ((window as TunerWindow).mytuner_scripts?.[SCRIPT_KEY]) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function PlaylistSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inited = useRef(false);
  const [visible, setVisible] = useState(false);
  const { t, days } = useI18n();
  const { theme } = useTheme();
  const border = theme === "light" ? "#ebe4d8" : "#1c1c24";

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || inited.current) return;
    inited.current = true;
    void loadScript()
      .then(() => {
        const init = (window as TunerWindow).mytuner_scripts?.[SCRIPT_KEY];
        if (init) init(MYTUNER_WIDGET_ID);
      })
      .catch(() => {});
  }, [visible]);

  return (
    <section id="history" className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <History className="size-4 text-accent" />
        <h2 className="text-[13px] font-semibold tracking-[0.18em] text-muted uppercase">
          {t("historyTitle")}
        </h2>
      </div>
      <div
        ref={rootRef}
        id={MYTUNER_WIDGET_ID}
        className={`${MYTUNER_WIDGET_ID.replace(/=/g, "")} mytuner-widget vd-mytuner relative`}
        data-target={MYTUNER_TARGET}
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
            alt="myTuner"
          />
        </a>
        <a
          className="vd-mytuner-station"
          href={`https://mytuner-radio.com/radio/vol-dance-${MYTUNER_TARGET}/`}
          rel="noopener"
          target="_blank"
        >
          <img
            src="https://static2.mytuner.mobi/media/tvos_radios/895/vol-dance.5bd9ac17.png"
            alt="Vol Dance"
          />
          <span>Vol Dance</span>
        </a>
        <ul id={`${MYTUNER_WIDGET_ID}playlist-day-selector`} className="vd-mytuner-days">
          {days.map((day, i) => (
            <li key={day} className="dow" data-dow={i}>
              {day}
            </li>
          ))}
        </ul>
        <ul
          id={`${MYTUNER_WIDGET_ID}playlist_songs`}
          className="vd-mytuner-songs vd-scroll"
          data-border="1"
          data-bordercolor={border}
        />
      </div>
    </section>
  );
}
