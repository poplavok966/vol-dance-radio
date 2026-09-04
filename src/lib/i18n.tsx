import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "uk" | "en";

const KEY = "vd_lang";

const uk = {
  metaTitle: "VOL DANCE — Твоя танцювальна хвиля",
  metaDesc:
    "VOL DANCE Radio — аматорська інтернет-радіостанція танцювальної музики. Live 24/7, Волочиськ.",
  navOnAir: "Ефір",
  navHistory: "Історія",
  navResidents: "Резиденти",
  navChat: "Чат",
  navRequest: "Замовлення",
  menu: "Меню",
  menuClose: "Закрити меню",
  menuNav: "Навігація",
  langUk: "UA",
  langEn: "EN",
  langSwitch: "Мова",
  themeLight: "Світла тема",
  themeDark: "Темна тема",
  uaTitle: "Підтримуємо захисників України",
  uaShort: "Україна",
  city: "Волочиськ",
  live: "Live · 24/7",
  listen: "Слухати",
  listenNow: "Слухати зараз",
  listenAir: "Слухати ефір",
  pause: "Пауза",
  volume: "Гучність",
  mute: "Вимкнути звук",
  unmute: "Увімкнути звук",
  requestTrack: "Замовити трек",
  onAirNow: "Зараз в ефірі",
  liveReady: "Live-потік готовий",
  tagline: "Твоя танцювальна хвиля",
  listeners: "слухачів",
  peak: "пік",
  fire: "Вогонь",
  love: "Подобається",
  historyTitle: "Історія ефіру · myTuner",
  days: ["пн", "вт", "ср", "чт", "пт", "сб", "нд"] as string[],
  teamKicker: "Команда ефіру",
  residentsTitle: "Резиденти",
  headliner: "Хедлайнер",
  quickTitle: "Швидкі дії",
  quickLead: "Замовлення в ефір або потік у власному плеєрі.",
  quickRequest: "Замовити трек",
  quickRequestHint: "Коротка заявка в ефір",
  quickM3u: ".M3U плейлист",
  quickM3uHint: "Для сторонніх плеєрів",
  quickFoot: "Потік іде безперервно. Повний віджет — на сторінці",
  quickFootLink: "замовлення",
  chatTitle: "Чат ефіру",
  chatIframe: "Чат VOL DANCE",
  chatFoot: "Чат надається сервісом Cbox. Дотримуйтесь",
  chatRules: "правил ефіру",
  footerAbout:
    "Аматорська некомерційна інтернет-радіостанція. Не є зареєстрованим суб’єктом у сфері медіа згідно із Законом України «Про медіа» № 2849-IX і не здійснює ефірного мовлення на радіочастотах загального користування.",
  footerAir: "Ефір",
  footerLegal: "Правове",
  footerOffer: "Публічна оферта",
  footerPrivacy: "Персональні дані",
  footerRules: "Правила ефіру",
  footerLegalInfo: "Правова інформація",
  footerChannel: "Telegram-канал",
  footerAccept: "Користуючись сайтом, ви акцептуєте",
  footerOfferLow: "публічну оферту",
  footerData: "Обробка персональних даних — згідно з",
  footerPolicy: "політикою",
  footerRights:
    "Авторські права на музичні твори належать їх правовласникам.",
  footerCopy: "VOL DANCE, м. Волочиськ, Хмельницька область.",
  cookie:
    "Технічні дані в браузері (гучність, згода) та cookies чату.",
  cookieLink: "Політика персональних даних",
  cookieOk: "Зрозуміло",
  requestKicker: "Ефір",
  requestTitle: "Замовлення треку",
  requestLead:
    "Оберіть трек у каталозі станції або надішліть коротку заявку. Замовлення розглядає ефір. Не надсилайте персональні дані третіх осіб. Правила — у",
  requestRules: "Правилах ефіру",
  requestShort: "Коротка заявка",
  requestShortLead:
    "Якщо каталог не відкрився, залиште назву тут. Заявка обробляється адміністрацією ефіру.",
  requestDialogTitle: "Замовлення треку",
  requestDialogLead: "Заявка потрапляє до ефіру. Не публікуйте персональні дані третіх осіб.",
  requestName: "Ім’я або нік",
  requestNamePh: "Павло",
  requestTrackLabel: "Виконавець та назва",
  requestMsg: "Повідомлення в ефір (необов’язково)",
  requestSend: "Надіслати",
  requestThanks: "Дякуємо. Замовлення прийнято до розгляду в ефірі.",
  requestFail: "Не вдалося надіслати",
  requestNeedTrack: "Вкажіть виконавця та назву треку",
  requestWait: "Зачекайте кілька секунд і спробуйте ще раз",
  requestCatalog: "Каталог треків станції",
  legalUpdated: "Редакція від {date} · м. Волочиськ, Україна",
  legalHome: "← На головну",
  alexxName: "Олександр Ганюк",
  alexxRole: "Хедлайнер · Event & Club DJ",
  alexxBio:
    "Хедлайнер VOL DANCE RADIO — Event & Club DJ із 16-річним досвідом. Офіційний резидент станції.",
  lisimaName: "Лія Будник",
  lisimaRole: "DJ · UA",
  lisimaBio:
    "Українська діджейка. У сетах — House, Indie Dance, Melodic Techno та Tech House: атмосферна електроніка, драйвовий грув і музика, що тримає вайб танцполу.",
  verumName: "Сергій Дорощук",
  verumRole: "Sound Producer & DJ · UA",
  verumBio:
    "Український sound producer та діджей, офіційний резидент VOL DANCE RADIO. Melodic Techno, Indie Dance, Trance.",
  quasarName: "Олександр Галушко",
  quasarRole: "Music Producer & DJ · UA",
  quasarBio:
    "Український music producer та діджей, офіційний резидент VOL DANCE RADIO. Tech House, Progressive House, Melodic Techno, Electro House.",
  exp16: "16 років досвіду",
};

const en: typeof uk = {
  metaTitle: "VOL DANCE — Your dance wave",
  metaDesc:
    "VOL DANCE Radio — amateur internet dance radio. Live 24/7 from Volochysk, Ukraine.",
  navOnAir: "On air",
  navHistory: "History",
  navResidents: "Residents",
  navChat: "Chat",
  navRequest: "Requests",
  menu: "Menu",
  menuClose: "Close menu",
  menuNav: "Navigation",
  langUk: "UA",
  langEn: "EN",
  langSwitch: "Language",
  themeLight: "Light theme",
  themeDark: "Dark theme",
  uaTitle: "We stand with Ukraine’s defenders",
  uaShort: "Ukraine",
  city: "Volochysk",
  live: "Live · 24/7",
  listen: "Listen",
  listenNow: "Listen now",
  listenAir: "Listen live",
  pause: "Pause",
  volume: "Volume",
  mute: "Mute",
  unmute: "Unmute",
  requestTrack: "Request a track",
  onAirNow: "On air now",
  liveReady: "Live stream ready",
  tagline: "Your dance wave",
  listeners: "listeners",
  peak: "peak",
  fire: "Fire",
  love: "Love",
  historyTitle: "On-air history · myTuner",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  teamKicker: "The air team",
  residentsTitle: "Residents",
  headliner: "Headliner",
  quickTitle: "Quick actions",
  quickLead: "Send a request to the air or take the stream to your own player.",
  quickRequest: "Request a track",
  quickRequestHint: "Short note to the air",
  quickM3u: ".M3U playlist",
  quickM3uHint: "For third-party players",
  quickFoot: "The stream stays on. Full catalogue lives on the",
  quickFootLink: "requests page",
  chatTitle: "On-air chat",
  chatIframe: "VOL DANCE chat",
  chatFoot: "Chat is powered by Cbox. Please follow the",
  chatRules: "on-air rules",
  footerAbout:
    "An amateur non-commercial internet radio station. Not a registered media entity under Ukraine’s Media Law No. 2849-IX and does not broadcast on public radio frequencies.",
  footerAir: "On air",
  footerLegal: "Legal",
  footerOffer: "Public offer",
  footerPrivacy: "Personal data",
  footerRules: "On-air rules",
  footerLegalInfo: "Legal notice",
  footerChannel: "Telegram channel",
  footerAccept: "By using this site you accept the",
  footerOfferLow: "public offer",
  footerData: "Personal data is processed under the",
  footerPolicy: "privacy policy",
  footerRights: "Copyright in musical works remains with the rightholders.",
  footerCopy: "VOL DANCE, Volochysk, Khmelnytskyi region, Ukraine.",
  cookie: "Technical browser data (volume, consent) and chat cookies.",
  cookieLink: "Personal data policy",
  cookieOk: "Got it",
  requestKicker: "On air",
  requestTitle: "Track request",
  requestLead:
    "Pick a track from the station catalogue or send a short request. The air team reviews it. Do not send other people’s personal data. See the",
  requestRules: "On-air rules",
  requestShort: "Short request",
  requestShortLead:
    "If the catalogue did not load, leave the title here. The air team will handle it.",
  requestDialogTitle: "Track request",
  requestDialogLead: "The request goes to the air. Do not publish third-party personal data.",
  requestName: "Name or nickname",
  requestNamePh: "Pavlo",
  requestTrackLabel: "Artist and title",
  requestMsg: "On-air message (optional)",
  requestSend: "Send",
  requestThanks: "Thank you. Your request has been received for the air.",
  requestFail: "Could not send",
  requestNeedTrack: "Please enter the artist and title",
  requestWait: "Wait a few seconds and try again",
  requestCatalog: "Station track catalogue",
  legalUpdated: "Edition of {date} · Volochysk, Ukraine",
  legalHome: "← Home",
  alexxName: "Oleksandr Haniuk",
  alexxRole: "Headliner · Event & Club DJ",
  alexxBio:
    "Headliner of VOL DANCE RADIO — event and club DJ with 16 years of experience. Official station resident.",
  lisimaName: "Lia Budnyk",
  lisimaRole: "DJ · UA",
  lisimaBio:
    "Ukrainian DJ. Sets of House, Indie Dance, Melodic Techno and Tech House: atmospheric electronics, driving groove and dance-floor energy.",
  verumName: "Serhii Doroshchuk",
  verumRole: "Sound Producer & DJ · UA",
  verumBio:
    "Ukrainian sound producer and DJ, official resident of VOL DANCE RADIO. Melodic Techno, Indie Dance, Trance.",
  quasarName: "Oleksandr Halushko",
  quasarRole: "Music Producer & DJ · UA",
  quasarBio:
    "Ukrainian music producer and DJ, official resident of VOL DANCE RADIO. Tech House, Progressive House, Melodic Techno, Electro House.",
  exp16: "16 years of experience",
};

const dict = { uk, en };

type UiKey = Exclude<keyof typeof uk, "days">;

type I18nValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: UiKey, vars?: Record<string, string | number>) => string;
  days: string[];
};

const I18nContext = createContext<I18nValue>({
  locale: "uk",
  setLocale: () => {},
  t: (key) => String(uk[key]),
  days: uk.days,
});

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.title = dict[locale].metaTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", dict[locale].metaDesc);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uk");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const next: Locale = saved === "en" ? "en" : "uk";
    setLocaleState(next);
    applyLocale(next);
  }, []);

  const setLocale = (next: Locale) => {
    localStorage.setItem(KEY, next);
    setLocaleState(next);
    applyLocale(next);
  };

  const t = (key: UiKey, vars?: Record<string, string | number>) => {
    let out = String(dict[locale][key]);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
    }
    return out;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, days: dict[locale].days }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
