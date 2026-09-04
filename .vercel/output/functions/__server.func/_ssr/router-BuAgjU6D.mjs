import { i as __toESM } from "../_runtime.mjs";
import { a as STREAM_URL, n as DEFAULT_TITLE, o as TELEGRAM_CHANNEL } from "./constants-CieyzSWs.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot, u as require_react_dom } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as TriangleAlert, c as Play, d as Moon, l as Pause, m as LoaderCircle, n as VolumeX, o as Sun, p as Menu, r as Volume2, s as Radio, t as X, y as Clock } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-C6NpIXRr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getStreamStats = createServerFn({ method: "GET" }).handler(createSsrRpc("bf96ac8e67814a40154603ed74d2677ef6314ce64884c74720583ba5681aacc0"));
var getReactions = createServerFn({ method: "GET" }).validator((input) => ({ track: String(input?.track ?? "") })).handler(createSsrRpc("e67de05bd3c0adade3a323e8ea8f39a0fb86750c0c14dd14ccacee3cb7425c19"));
var voteReaction = createServerFn({ method: "POST" }).validator((input) => {
	const kind = input?.kind === "love" ? "love" : "fire";
	const action = input?.action === "remove" ? "remove" : "add";
	return {
		track: String(input?.track ?? ""),
		kind,
		action
	};
}).handler(createSsrRpc("58333d92f983e6ca3c212c3a03fe714d429da3c8c9f57f3c2a839ce91a4721b4"));
var sendTrackRequest = createServerFn({ method: "POST" }).validator((input) => {
	const track = String(input?.track ?? "").trim().slice(0, 200);
	if (track.length < 2) throw new Error("TRACK_REQUIRED");
	return {
		name: String(input?.name ?? "").trim().slice(0, 80),
		track,
		message: String(input?.message ?? "").trim().slice(0, 280)
	};
}).handler(createSsrRpc("10ad411d33e64a585d2cede8d6854d740cc69d8ce5a44129943eb87d1d1b4be9"));
var ThemeContext = (0, import_react.createContext)({
	theme: "dark",
	toggle: () => {}
});
var KEY$2 = "vd_theme";
var KYIV = "Europe/Kyiv";
var SUN_URL = "https://api.open-meteo.com/v1/forecast?latitude=49.53&longitude=26.18&daily=sunrise,sunset&timezone=Europe/Kyiv";
function applyTheme(theme) {
	const root = document.documentElement;
	root.classList.toggle("light", theme === "light");
	root.style.colorScheme = theme;
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", theme === "light" ? "#f4efe6" : "#0c0c10");
}
function readMode() {
	const saved = localStorage.getItem(KEY$2);
	if (saved === "light" || saved === "dark" || saved === "auto") return saved;
	return "auto";
}
function kyivHour(now = /* @__PURE__ */ new Date()) {
	const hour = new Intl.DateTimeFormat("en-GB", {
		timeZone: KYIV,
		hour: "numeric",
		hour12: false
	}).format(now);
	return Number(hour);
}
function isNight(sunrise, sunset) {
	const now = /* @__PURE__ */ new Date();
	if (sunrise && sunset) return now >= sunset || now < sunrise;
	const hour = kyivHour(now);
	return hour >= 20 || hour < 7;
}
function osDark() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function resolveTheme(mode, sunrise, sunset) {
	if (mode === "light" || mode === "dark") return mode;
	return osDark() || isNight(sunrise, sunset) ? "dark" : "light";
}
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		let sunrise;
		let sunset;
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
		}, 6e4);
		fetch(SUN_URL).then((r) => r.json()).then((d) => {
			const up = d?.daily?.sunrise?.[0];
			const down = d?.daily?.sunset?.[0];
			if (up) sunrise = new Date(up);
			if (down) sunset = new Date(down);
			if (readMode() === "auto") sync();
		}).catch(() => {});
		return () => {
			media.removeEventListener("change", onScheme);
			window.clearInterval(tick);
		};
	}, []);
	const toggle = () => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			localStorage.setItem(KEY$2, next);
			applyTheme(next);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			toggle
		},
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
			ghost: "text-muted hover:bg-secondary hover:text-foreground",
			accent: "bg-accent text-accent-foreground hover:bg-accent/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3.5 text-xs",
			lg: "h-12 px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BuAgjU6D.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
var RadioContext = (0, import_react.createContext)(null);
function RadioProvider({ children }) {
	const audioRef = (0, import_react.useRef)(null);
	const ctxRef = (0, import_react.useRef)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isBuffering, setIsBuffering] = (0, import_react.useState)(false);
	const [volume, setVolumeState] = (0, import_react.useState)(.8);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [trackName, setTrackName] = (0, import_react.useState)(DEFAULT_TITLE);
	const [listeners, setListeners] = (0, import_react.useState)(0);
	const [peak, setPeak] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const audio = new Audio();
		audio.preload = "none";
		audio.volume = .8;
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
	(0, import_react.useEffect)(() => {
		let alive = true;
		const pull = async () => {
			try {
				const stats = await getStreamStats();
				if (!alive) return;
				setTrackName(stats.title || "VOL DANCE — On Air");
				setListeners(stats.listeners);
				setPeak(stats.peak);
			} catch {}
		};
		pull();
		const id = window.setInterval(pull, 1e4);
		return () => {
			alive = false;
			window.clearInterval(id);
		};
	}, []);
	const toggle = (0, import_react.useCallback)(async () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (!ctxRef.current) {
			const Ctx = window.AudioContext || window.webkitAudioContext;
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
	const setVolume = (0, import_react.useCallback)((v) => {
		const clamped = Math.min(1, Math.max(0, v));
		setVolumeState(clamped);
		setMuted(clamped === 0);
		if (audioRef.current) audioRef.current.volume = clamped;
	}, []);
	const toggleMute = (0, import_react.useCallback)(() => {
		setMuted((prev) => {
			const next = !prev;
			if (audioRef.current) audioRef.current.volume = next ? 0 : volume;
			return next;
		});
	}, [volume]);
	const value = (0, import_react.useMemo)(() => ({
		isPlaying,
		isBuffering,
		volume: muted ? 0 : volume,
		muted,
		trackName,
		listeners,
		peak,
		toggle,
		setVolume,
		toggleMute
	}), [
		isPlaying,
		isBuffering,
		volume,
		muted,
		trackName,
		listeners,
		peak,
		toggle,
		setVolume,
		toggleMute
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioContext.Provider, {
		value,
		children
	});
}
function useRadio() {
	const ctx = (0, import_react.useContext)(RadioContext);
	if (!ctx) throw new Error("useRadio must be used within RadioProvider");
	return ctx;
}
var KEY$1 = "vd_lang";
var uk = {
	metaTitle: "VOL DANCE — Твоя танцювальна хвиля",
	metaDesc: "VOL DANCE Radio — аматорська інтернет-радіостанція танцювальної музики. Live 24/7, Волочиськ.",
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
	days: [
		"пн",
		"вт",
		"ср",
		"чт",
		"пт",
		"сб",
		"нд"
	],
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
	footerAbout: "Аматорська некомерційна інтернет-радіостанція. Не є зареєстрованим суб’єктом у сфері медіа згідно із Законом України «Про медіа» № 2849-IX і не здійснює ефірного мовлення на радіочастотах загального користування.",
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
	footerRights: "Авторські права на музичні твори належать їх правовласникам.",
	footerCopy: "VOL DANCE, м. Волочиськ, Хмельницька область.",
	cookie: "Технічні дані в браузері (гучність, згода) та cookies чату.",
	cookieLink: "Політика персональних даних",
	cookieOk: "Зрозуміло",
	requestKicker: "Ефір",
	requestTitle: "Замовлення треку",
	requestLead: "Оберіть трек у каталозі станції або надішліть коротку заявку. Замовлення розглядає ефір. Не надсилайте персональні дані третіх осіб. Правила — у",
	requestRules: "Правилах ефіру",
	requestShort: "Коротка заявка",
	requestShortLead: "Якщо каталог не відкрився, залиште назву тут. Заявка обробляється адміністрацією ефіру.",
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
	alexxBio: "Хедлайнер VOL DANCE RADIO — Event & Club DJ із 16-річним досвідом. Офіційний резидент станції.",
	lisimaName: "Лія Будник",
	lisimaRole: "DJ · UA",
	lisimaBio: "Українська діджейка. У сетах — House, Indie Dance, Melodic Techno та Tech House: атмосферна електроніка, драйвовий грув і музика, що тримає вайб танцполу.",
	verumName: "Сергій Дорощук",
	verumRole: "Sound Producer & DJ · UA",
	verumBio: "Український sound producer та діджей, офіційний резидент VOL DANCE RADIO. Melodic Techno, Indie Dance, Trance.",
	quasarName: "Олександр Галушко",
	quasarRole: "Music Producer & DJ · UA",
	quasarBio: "Український music producer та діджей, офіційний резидент VOL DANCE RADIO. Tech House, Progressive House, Melodic Techno, Electro House.",
	exp16: "16 років досвіду"
};
var dict = {
	uk,
	en: {
		metaTitle: "VOL DANCE — Your dance wave",
		metaDesc: "VOL DANCE Radio — amateur internet dance radio. Live 24/7 from Volochysk, Ukraine.",
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
		days: [
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun"
		],
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
		footerAbout: "An amateur non-commercial internet radio station. Not a registered media entity under Ukraine’s Media Law No. 2849-IX and does not broadcast on public radio frequencies.",
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
		requestLead: "Pick a track from the station catalogue or send a short request. The air team reviews it. Do not send other people’s personal data. See the",
		requestRules: "On-air rules",
		requestShort: "Short request",
		requestShortLead: "If the catalogue did not load, leave the title here. The air team will handle it.",
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
		alexxBio: "Headliner of VOL DANCE RADIO — event and club DJ with 16 years of experience. Official station resident.",
		lisimaName: "Lia Budnyk",
		lisimaRole: "DJ · UA",
		lisimaBio: "Ukrainian DJ. Sets of House, Indie Dance, Melodic Techno and Tech House: atmospheric electronics, driving groove and dance-floor energy.",
		verumName: "Serhii Doroshchuk",
		verumRole: "Sound Producer & DJ · UA",
		verumBio: "Ukrainian sound producer and DJ, official resident of VOL DANCE RADIO. Melodic Techno, Indie Dance, Trance.",
		quasarName: "Oleksandr Halushko",
		quasarRole: "Music Producer & DJ · UA",
		quasarBio: "Ukrainian music producer and DJ, official resident of VOL DANCE RADIO. Tech House, Progressive House, Melodic Techno, Electro House.",
		exp16: "16 years of experience"
	}
};
var I18nContext = (0, import_react.createContext)({
	locale: "uk",
	setLocale: () => {},
	t: (key) => String(uk[key]),
	days: uk.days
});
function applyLocale(locale) {
	document.documentElement.lang = locale;
	document.title = dict[locale].metaTitle;
	const desc = document.querySelector("meta[name=\"description\"]");
	if (desc) desc.setAttribute("content", dict[locale].metaDesc);
}
function LocaleProvider({ children }) {
	const [locale, setLocaleState] = (0, import_react.useState)("uk");
	(0, import_react.useEffect)(() => {
		const next = localStorage.getItem(KEY$1) === "en" ? "en" : "uk";
		setLocaleState(next);
		applyLocale(next);
	}, []);
	const setLocale = (next) => {
		localStorage.setItem(KEY$1, next);
		setLocaleState(next);
		applyLocale(next);
	};
	const t = (key, vars) => {
		let out = String(dict[locale][key]);
		if (vars) for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
		return out;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, {
		value: {
			locale,
			setLocale,
			t,
			days: dict[locale].days
		},
		children
	});
}
function useI18n() {
	return (0, import_react.useContext)(I18nContext);
}
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioProvider, { children }) }) });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function headerOffset() {
	const header = document.querySelector("header");
	return header ? header.getBoundingClientRect().height + 8 : 72;
}
function pinTop() {
	const html = document.documentElement;
	const prev = html.style.scrollBehavior;
	html.style.scrollBehavior = "auto";
	window.scrollTo({
		top: 0,
		behavior: "auto"
	});
	html.scrollTop = 0;
	document.body.scrollTop = 0;
	html.style.scrollBehavior = prev;
}
function scrollToHash(hash) {
	const id = hash.replace(/^#/, "");
	if (id === "on-air") {
		pinTop();
		requestAnimationFrame(pinTop);
		window.setTimeout(pinTop, 50);
		window.setTimeout(pinTop, 200);
		return true;
	}
	const el = document.getElementById(id);
	if (!el) return false;
	const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
	window.scrollTo({
		top: Math.max(0, top),
		behavior: "smooth"
	});
	return true;
}
function jumpTo(hash) {
	if (scrollToHash(hash)) return;
	[
		50,
		160,
		320,
		500
	].forEach((ms) => {
		window.setTimeout(() => scrollToHash(hash), ms);
	});
}
function HashLink({ hash, className, children, onNavigate }) {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const onClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		onNavigate?.();
		if (pathname === "/") {
			window.history.replaceState(null, "", hash === "on-air" ? "/" : `/#${hash}`);
			jumpTo(hash);
			return;
		}
		Promise.resolve(hash === "on-air" ? navigate({ to: "/" }) : navigate({
			to: "/",
			hash
		})).then(() => jumpTo(hash));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: hash === "on-air" ? "/" : `/#${hash}`,
		className,
		onClick,
		children
	});
}
var linkClass = "flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold tracking-wide uppercase hover:bg-secondary hover:text-primary";
function SiteMenu({ open, onClose }) {
	const { t } = useI18n();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onClose]);
	if (!mounted || !open) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vd-menu fixed inset-0 lg:hidden",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": t("menu"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
			"aria-label": t("menuClose"),
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "vd-menu-panel absolute inset-y-0 right-0 flex h-dvh w-80 max-w-[85vw] flex-col border-l border-border bg-card shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg font-semibold tracking-wide text-primary italic",
					children: "VOL DANCE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-semibold tracking-[0.22em] text-muted uppercase",
					children: t("live")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center rounded-full hover:bg-secondary",
					"aria-label": t("menuClose"),
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "min-h-0 flex-1 overflow-y-auto px-3 py-4 pb-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 pb-2 text-[11px] font-semibold tracking-widest text-muted uppercase",
						children: t("menuNav")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-0.5",
						children: [
							[
								{
									hash: "on-air",
									label: t("navOnAir")
								},
								{
									hash: "history",
									label: t("navHistory")
								},
								{
									hash: "residents",
									label: t("navResidents")
								},
								{
									hash: "chat",
									label: t("navChat")
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashLink, {
								hash: item.hash,
								className: linkClass,
								onNavigate: onClose,
								children: item.label
							}, item.hash)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/request",
								className: linkClass,
								onClick: onClose,
								children: t("navRequest")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: TELEGRAM_CHANNEL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: linkClass,
								onClick: onClose,
								children: "Telegram"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 px-3 pb-2 text-[11px] font-semibold tracking-widest text-muted uppercase",
						children: t("footerLegal")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/offer",
								className: linkClass,
								onClick: onClose,
								children: t("footerOffer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: linkClass,
								onClick: onClose,
								children: t("footerPrivacy")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/rules",
								className: linkClass,
								onClick: onClose,
								children: t("footerRules")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/legal",
								className: linkClass,
								onClick: onClose,
								children: t("footerLegalInfo")
							})
						]
					})
				]
			})]
		})]
	}), document.body);
}
function UaFlag({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex overflow-hidden rounded-[2px] ${className}`,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex h-3 w-4 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 bg-[#0057b7]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 bg-[#ffd700]" })]
		})
	});
}
function formatClock(now) {
	return [
		now.getHours(),
		now.getMinutes(),
		now.getSeconds()
	].map((n) => String(n).padStart(2, "0")).join(":");
}
function useClock() {
	const [time, setTime] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const tick = () => setTime(formatClock(/* @__PURE__ */ new Date()));
		tick();
		const id = setInterval(tick, 1e3);
		return () => clearInterval(id);
	}, []);
	return time || "00:00:00";
}
function SiteHeader() {
	const time = useClock();
	const { theme, toggle } = useTheme();
	const { locale, setLocale, t } = useI18n();
	const [weather, setWeather] = (0, import_react.useState)(null);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		setMenuOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		fetch("https://api.open-meteo.com/v1/forecast?latitude=49.53&longitude=26.18&current_weather=true").then((r) => r.json()).then((d) => setWeather({ temp: Math.round(d.current_weather.temperature) })).catch(() => {});
	}, []);
	const temp = weather !== null ? `${weather.temp > 0 ? "+" : ""}${weather.temp}°C` : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-3 lg:flex lg:flex-wrap lg:justify-between lg:gap-3 lg:px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-start lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						title: t("uaTitle"),
						className: "inline-flex size-9 items-center justify-center rounded-full border border-border bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UaFlag, {})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "hidden min-w-0 items-center gap-3 lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
							className: "size-5",
							strokeWidth: 2.4
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display block text-xl font-semibold tracking-wide text-primary italic",
							children: "VOL DANCE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-semibold tracking-[0.22em] text-muted uppercase",
							children: t("live")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "justify-self-center lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display block text-center text-xl font-semibold tracking-wide text-primary italic",
						children: "VOL DANCE"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: [
						{
							hash: "on-air",
							label: t("navOnAir")
						},
						{
							hash: "history",
							label: t("navHistory")
						},
						{
							hash: "residents",
							label: t("navResidents")
						},
						{
							hash: "chat",
							label: t("navChat")
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashLink, {
						hash: item.hash,
						className: "rounded-full px-3 py-2 text-xs font-semibold tracking-widest text-muted uppercase hover:bg-secondary hover:text-foreground",
						children: item.label
					}, item.hash))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							title: t("uaTitle"),
							className: "hidden h-9 items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 text-[11px] font-semibold lg:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UaFlag, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("uaShort") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1.5 text-xs text-accent lg:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: time
							})]
						}),
						temp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden rounded-full border border-border bg-secondary px-2.5 py-1.5 text-xs lg:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-primary",
								children: temp
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-muted",
								children: t("city")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex h-9 overflow-hidden rounded-full border border-border",
							role: "group",
							"aria-label": t("langSwitch"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `px-2.5 text-[11px] font-bold ${locale === "uk" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted hover:text-foreground"}`,
								onClick: () => setLocale("uk"),
								children: t("langUk")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `px-2.5 text-[11px] font-bold ${locale === "en" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted hover:text-foreground"}`,
								onClick: () => setLocale("en"),
								children: t("langEn")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							variant: "outline",
							onClick: toggle,
							"aria-label": theme === "light" ? t("themeDark") : t("themeLight"),
							children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "hidden lg:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/request",
								children: t("navRequest")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "hidden lg:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: TELEGRAM_CHANNEL,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Telegram"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							variant: "outline",
							className: "lg:hidden",
							"aria-label": t("menu"),
							"aria-expanded": menuOpen,
							onClick: () => setMenuOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteMenu, {
			open: menuOpen,
			onClose: () => setMenuOpen(false)
		})]
	});
}
function PlayerBar() {
	const { isPlaying, isBuffering, trackName, volume, muted, toggle, setVolume, toggleMute } = useRadio();
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed right-0 bottom-0 left-0 z-40 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vd-hair h-px w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid h-[84px] w-full max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void toggle(),
					"aria-label": isPlaying ? t("pause") : t("listen"),
					className: "grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground",
					children: isBuffering ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 translate-x-px fill-current" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold tracking-[0.2em] text-muted uppercase",
						children: "VOL DANCE Radio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-semibold",
						children: trackName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `vd-eq hidden h-5 items-end gap-0.5 md:flex ${isPlaying ? "on" : ""}`,
							"aria-hidden": true,
							children: Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleMute,
							"aria-label": muted ? t("unmute") : t("mute"),
							className: "grid size-11 place-items-center text-muted hover:text-foreground",
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							className: "hidden w-24 accent-accent sm:block",
							min: 0,
							max: 1,
							step: .01,
							value: volume,
							onChange: (e) => setVolume(Number(e.target.value)),
							"aria-label": t("volume"),
							suppressHydrationWarning: true
						})
					]
				})
			]
		})]
	});
}
var KEY = "vd_cookie_ok";
function CookieNotice() {
	const { t } = useI18n();
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setShow(localStorage.getItem(KEY) !== "1");
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-24 z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-relaxed text-muted sm:text-sm",
				children: [
					t("cookie"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "text-foreground underline decoration-border underline-offset-2",
						children: t("cookieLink")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "shrink-0",
				onClick: () => {
					localStorage.setItem(KEY, "1");
					setShow(false);
				},
				children: t("cookieOk")
			})]
		})
	});
}
function AppChrome({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vd-page min-h-screen pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieNotice, {})
		]
	});
}
var styles_default = "/assets/styles-CkQa8gUd.css";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VOL DANCE — Твоя танцювальна хвиля" },
			{
				name: "description",
				content: "VOL DANCE Radio — аматорська інтернет-радіостанція танцювальної музики. Live 24/7, Волочиськ."
			},
			{
				name: "theme-color",
				content: "#0c0c10"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap"
			}
		],
		scripts: [{ children: "try{var s=localStorage.getItem('vd_theme');var t;if(s==='light'||s==='dark')t=s;else{var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var h=(new Date()).getHours();t=(d||h>=20||h<7)?'dark':'light'}if(t==='light')document.documentElement.classList.add('light')}catch(e){}" }]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "uk",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-Q_3XkRjp.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./legal-DPhgs9Ff.mjs");
var Route$4 = createFileRoute("/legal")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./offer-Cmqa0nOK.mjs");
var Route$3 = createFileRoute("/offer")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./privacy-Dr_ZF4v8.mjs");
var Route$2 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./request-DpiGYgtI.mjs");
var Route$1 = createFileRoute("/request")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./rules-DbXghxE2.mjs");
var Route = createFileRoute("/rules")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	LegalRoute: Route$4.update({
		id: "/legal",
		path: "/legal",
		getParentRoute: () => Route$6
	}),
	OfferRoute: Route$3.update({
		id: "/offer",
		path: "/offer",
		getParentRoute: () => Route$6
	}),
	PrivacyRoute: Route$2.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$6
	}),
	RequestRoute: Route$1.update({
		id: "/request",
		path: "/request",
		getParentRoute: () => Route$6
	}),
	RulesRoute: Route.update({
		id: "/rules",
		path: "/rules",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useI18n as a, cn as c, useTheme as d, voteReaction as f, scrollToHash as i, getReactions as l, UaFlag as n, useRadio as o, HashLink as r, Button as s, router_exports as t, sendTrackRequest as u };
