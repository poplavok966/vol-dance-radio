import { i as __toESM } from "../_runtime.mjs";
import { a as STREAM_URL, i as MYTUNER_WIDGET_ID, r as MYTUNER_TARGET, t as CBOX_SRC } from "./constants-CieyzSWs.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Download, c as Play, f as MessagesSquare, g as Flame, h as Heart, i as Users, l as Pause, m as History, p as LoaderCircle, s as Radio, u as Music } from "../_libs/lucide-react.mjs";
import { a as useI18n, c as cn, d as useTheme, f as voteReaction, i as scrollToHash, l as getReactions, o as useRadio, s as Button } from "./router-PByhQ-U4.mjs";
import { t as SiteFooter } from "./site-footer-CQ0OgReR.mjs";
import { t as RequestDialog } from "./request-form-BuHW4ehm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BgThz6qV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BARS = 48;
function AudioVisualizer() {
	const { isPlaying } = useRadio();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("vd-eq flex h-16 w-full items-end gap-px overflow-hidden sm:h-20", isPlaying && "on"),
		"aria-hidden": true,
		children: Array.from({ length: BARS }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
			className: "min-h-1 flex-1",
			style: { animationDelay: `${i % 9 * .07}s` }
		}, i))
	});
}
function likeKey(track, kind) {
	return `vd_liked_${kind}::${track}`;
}
function TrackReactions() {
	const { trackName } = useRadio();
	const { t } = useI18n();
	const [counts, setCounts] = (0, import_react.useState)({
		fire: 0,
		love: 0
	});
	const [liked, setLiked] = (0, import_react.useState)({
		fire: false,
		love: false
	});
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		setLiked({
			fire: localStorage.getItem(likeKey(trackName, "fire")) === "1",
			love: localStorage.getItem(likeKey(trackName, "love")) === "1"
		});
		getReactions({ data: { track: trackName } }).then((data) => {
			if (active) setCounts({
				fire: data.fire ?? 0,
				love: data.love ?? 0
			});
		}).catch(() => {});
		return () => {
			active = false;
		};
	}, [trackName]);
	const react = async (kind) => {
		if (pending) return;
		const isLiked = liked[kind];
		setPending(true);
		setLiked((p) => ({
			...p,
			[kind]: !isLiked
		}));
		setCounts((p) => ({
			...p,
			[kind]: Math.max(0, p[kind] + (isLiked ? -1 : 1))
		}));
		if (isLiked) localStorage.removeItem(likeKey(trackName, kind));
		else localStorage.setItem(likeKey(trackName, kind), "1");
		try {
			const data = await voteReaction({ data: {
				track: trackName,
				kind,
				action: isLiked ? "remove" : "add"
			} });
			setCounts({
				fire: data.fire ?? 0,
				love: data.love ?? 0
			});
		} catch {} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => void react("fire"),
			"aria-pressed": liked.fire,
			"aria-label": t("fire"),
			className: cn("inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold", liked.fire ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary text-primary hover:border-primary/50"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: counts.fire
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => void react("love"),
			"aria-pressed": liked.love,
			"aria-label": t("love"),
			className: cn("inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold", liked.love ? "border-destructive bg-destructive/15 text-destructive" : "border-border bg-secondary text-destructive hover:border-destructive/50"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", liked.love && "fill-current") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: counts.love
			})]
		})]
	});
}
function NowPlaying() {
	const { isPlaying, isBuffering, trackName, listeners, peak, toggle } = useRadio();
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "on-air",
		className: "overflow-hidden rounded-xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void toggle(),
				"aria-label": isPlaying ? t("pause") : t("listenAir"),
				className: "relative mx-auto size-36 shrink-0 lg:mx-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-0 rounded-full border-8 border-background bg-[conic-gradient(from_200deg,#1a1a22,#2c2c36,#111,#2c2c36,#1a1a22)]", isPlaying && "vd-vinyl") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-[30%] rounded-full bg-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-[44%] rounded-full bg-background ring-1 ring-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative z-10 grid size-full place-items-center text-primary-foreground",
						children: isBuffering ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin" }) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-8 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-8 translate-x-0.5 fill-current" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 text-center lg:text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase lg:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-pulse size-1.5 rounded-full bg-primary" }), isPlaying ? t("onAirNow") : t("liveReady")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase",
						children: t("tagline")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 break-words font-display text-3xl leading-tight font-semibold tracking-wide sm:text-5xl",
						children: trackName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "tabular-nums text-foreground",
									children: listeners
								}),
								t("listeners")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4 text-primary" }),
								t("peak"),
								" ",
								peak,
								" · 24/7"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => void toggle(),
								size: "lg",
								children: isPlaying ? t("pause") : t("listenNow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/request",
									children: t("requestTrack")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackReactions, {})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-24 px-5 pb-5 sm:h-28 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioVisualizer, {})
		})]
	});
}
var GENRES = [
	"House",
	"Tech House",
	"Melodic Techno",
	"Progressive",
	"Indie Dance",
	"Electro House",
	"Trance",
	"Club Mix",
	"Peak Time"
];
function GenreRibbon() {
	const loop = [...GENRES, ...GENRES];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-full border border-border bg-secondary py-2.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "vd-marquee flex w-max gap-8 pr-8",
			children: loop.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[11px] font-semibold tracking-[0.24em] text-muted uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-8 text-primary",
					children: "●"
				}), g]
			}, `${g}-${i}`))
		})
	});
}
var SCRIPT_KEY = "playlist-v1.js";
var SCRIPT_SRC = `https://mytuner-radio.com/static/js/widgets/${SCRIPT_KEY}`;
var scriptPromise = null;
function loadScript() {
	if (scriptPromise) return scriptPromise;
	scriptPromise = new Promise((resolve, reject) => {
		const w = window;
		w.mytuner_scripts = w.mytuner_scripts ?? {};
		const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", () => reject());
			if (window.mytuner_scripts?.[SCRIPT_KEY]) resolve();
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
function PlaylistSection() {
	const rootRef = (0, import_react.useRef)(null);
	const inited = (0, import_react.useRef)(false);
	const [visible, setVisible] = (0, import_react.useState)(false);
	const { t, days } = useI18n();
	const { theme } = useTheme();
	const border = theme === "light" ? "#ebe4d8" : "#1c1c24";
	(0, import_react.useEffect)(() => {
		const node = rootRef.current;
		if (!node) return;
		const io = new IntersectionObserver((entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				setVisible(true);
				io.disconnect();
			}
		}, { rootMargin: "240px" });
		io.observe(node);
		return () => io.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!visible || inited.current) return;
		inited.current = true;
		loadScript().then(() => {
			const init = window.mytuner_scripts?.[SCRIPT_KEY];
			if (init) init(MYTUNER_WIDGET_ID);
		}).catch(() => {});
	}, [visible]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "history",
		className: "rounded-xl border border-border bg-card p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[13px] font-semibold tracking-[0.18em] text-muted uppercase",
				children: t("historyTitle")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: rootRef,
			id: MYTUNER_WIDGET_ID,
			className: `${MYTUNER_WIDGET_ID.replace(/=/g, "")} mytuner-widget vd-mytuner relative`,
			"data-target": MYTUNER_TARGET,
			"data-requires_initialization": "true",
			"data-fdow": "0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "vd-mytuner-logo",
					href: "https://mytuner-radio.com?utm_source=widget&utm_medium=playlist",
					rel: "noopener",
					target: "_blank",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://mytuner-radio.com/static/icons/widgets/MyTuner_Logo/MyTunerLogo_Normal.png",
						alt: "myTuner"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "vd-mytuner-station",
					href: `https://mytuner-radio.com/radio/vol-dance-${MYTUNER_TARGET}/`,
					rel: "noopener",
					target: "_blank",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://static2.mytuner.mobi/media/tvos_radios/895/vol-dance.5bd9ac17.png",
						alt: "Vol Dance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vol Dance" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					id: `${MYTUNER_WIDGET_ID}playlist-day-selector`,
					className: "vd-mytuner-days",
					children: days.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "dow",
						"data-dow": i,
						children: day
					}, day))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					id: `${MYTUNER_WIDGET_ID}playlist_songs`,
					className: "vd-mytuner-songs vd-scroll",
					"data-border": "1",
					"data-bordercolor": border
				})
			]
		})]
	});
}
var RESIDENTS = [
	{
		id: "alexx",
		name: "Dj Alexx",
		realName: "Олександр Ганюк",
		role: "Хедлайнер · Event & Club DJ",
		photo: "/residents/alex.jpg",
		objectPos: "object-center",
		bio: "Хедлайнер VOL DANCE RADIO — Event & Club DJ із 16-річним досвідом. Офіційний резидент станції.",
		genres: [
			"Event",
			"Club",
			"16 років досвіду"
		],
		links: [{
			type: "instagram",
			label: "Instagram",
			href: "https://www.instagram.com/alexx_dj_/"
		}, {
			type: "telegram",
			label: "Telegram",
			href: "https://t.me/alexxdj"
		}],
		featured: true
	},
	{
		id: "lisima",
		name: "DJ LISIMA",
		realName: "Лія Будник",
		role: "DJ · UA",
		photo: "/residents/lisima.jpg",
		objectPos: "object-top",
		bio: "Українська діджейка. У сетах — House, Indie Dance, Melodic Techno та Tech House: атмосферна електроніка, драйвовий грув і музика, що тримає вайб танцполу.",
		genres: [
			"House",
			"Indie Dance",
			"Melodic Techno",
			"Tech House"
		],
		links: [
			{
				type: "instagram",
				label: "Instagram",
				href: "https://www.instagram.com/li_budnyk"
			},
			{
				type: "soundcloud",
				label: "SoundCloud",
				href: "https://on.soundcloud.com/YMDyzMziW2xpLoUktc"
			},
			{
				type: "telegram",
				label: "Telegram",
				href: "https://t.me/Li_Budnyk"
			}
		]
	},
	{
		id: "verum",
		name: "Verum Void",
		realName: "Сергій Дорощук",
		role: "Sound Producer & DJ · UA",
		photo: "/residents/verumvoid.jpg",
		objectPos: "object-[center_20%]",
		bio: "Український sound producer та діджей, офіційний резидент VOL DANCE RADIO. Melodic Techno, Indie Dance, Trance.",
		genres: [
			"Melodic Techno",
			"Indie Dance",
			"Trance"
		],
		links: [
			{
				type: "youtube",
				label: "YouTube",
				href: "https://www.youtube.com/@VerumVoid"
			},
			{
				type: "spotify",
				label: "Spotify",
				href: "https://open.spotify.com/artist/0DY8fkAKJeynQzDvHC7bg3?si=BmxiWyGZQSWxGiVSQtydcQ"
			},
			{
				type: "instagram",
				label: "Instagram",
				href: "https://instagram.com/verum_void"
			},
			{
				type: "telegram",
				label: "Telegram",
				href: "https://t.me/verum_void"
			},
			{
				type: "facebook",
				label: "Facebook",
				href: "https://facebook.com/sergey.doroshchuk.7"
			},
			{
				type: "tiktok",
				label: "TikTok",
				href: "https://tiktok.com/@verum_void"
			},
			{
				type: "threads",
				label: "Threads",
				href: "https://threads.com/@verum_void"
			}
		]
	},
	{
		id: "quasar",
		name: "Quasar-89",
		realName: "Олександр Галушко",
		role: "Music Producer & DJ · UA",
		photo: "/residents/quasar.jpg",
		objectPos: "object-top",
		bio: "Український music producer та діджей, офіційний резидент VOL DANCE RADIO. Tech House, Progressive House, Melodic Techno, Electro House.",
		genres: [
			"Tech House",
			"Progressive House",
			"Melodic Techno",
			"Electro House"
		],
		links: [
			{
				type: "instagram",
				label: "Instagram",
				href: "https://www.instagram.com/quasar89music/"
			},
			{
				type: "spotify",
				label: "Spotify",
				href: "https://open.spotify.com/artist/1L8v9aXzezquw8rVInJOe7"
			},
			{
				type: "soundcloud",
				label: "SoundCloud",
				href: "https://soundcloud.com/user-763148322"
			},
			{
				type: "telegram",
				label: "Telegram",
				href: "https://t.me/Quasar89music"
			},
			{
				type: "youtube",
				label: "YouTube",
				href: "https://www.youtube.com/@Quasar-89"
			}
		]
	}
];
var SOCIAL_TINT = {
	telegram: "bg-[#229ed9]",
	youtube: "bg-[#ff0033]",
	instagram: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
	soundcloud: "bg-primary",
	spotify: "bg-[#1db954]",
	facebook: "bg-[#1877f2]",
	tiktok: "bg-foreground/90 text-background",
	threads: "bg-foreground/90 text-background"
};
function SocialChip({ link }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: link.href,
		target: "_blank",
		rel: "noopener noreferrer",
		className: cn("inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold text-primary-foreground", SOCIAL_TINT[link.type]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: `/brands/${link.type}.svg`,
			alt: "",
			className: "size-3.5 brightness-0 invert"
		}), link.label]
	});
}
function Tags({ genres }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 flex flex-wrap gap-1.5",
		children: genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold",
			children: g
		}, g))
	});
}
function ResidentsSection() {
	const { t } = useI18n();
	const featured = RESIDENTS.find((r) => r.featured);
	const rest = RESIDENTS.filter((r) => !r.featured);
	const copy = {
		alexx: {
			name: t("alexxName"),
			role: t("alexxRole"),
			bio: t("alexxBio")
		},
		lisima: {
			name: t("lisimaName"),
			role: t("lisimaRole"),
			bio: t("lisimaBio")
		},
		verum: {
			name: t("verumName"),
			role: t("verumRole"),
			bio: t("verumBio")
		},
		quasar: {
			name: t("quasarName"),
			role: t("quasarRole"),
			bio: t("quasarBio")
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "residents",
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.22em] text-primary uppercase",
				children: t("teamKicker")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display mt-1 text-3xl font-semibold tracking-wide",
				children: [
					t("residentsTitle"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary italic",
						children: "VOL DANCE"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				className: "overflow-hidden rounded-xl border border-primary/35 bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-[220px_minmax(0,1fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-64 md:h-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: featured.photo,
							alt: `${featured.name} — ${copy[featured.id].name}`,
							className: `absolute inset-0 h-full w-full object-cover ${featured.objectPos}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wider text-primary-foreground uppercase",
							children: t("headliner")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 sm:p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-3xl font-semibold tracking-wide",
								children: featured.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: copy[featured.id].name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs font-semibold tracking-wide text-primary uppercase",
								children: copy[featured.id].role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
								children: copy[featured.id].bio
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, { genres: featured.genres.map((g) => g.includes("16") ? t("exp16") : g) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: featured.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialChip, { link: l }, l.href))
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: rest.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col overflow-hidden rounded-xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: r.photo,
							alt: `${r.name} — ${copy[r.id].name}`,
							className: `h-full w-full object-cover ${r.objectPos}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4 pt-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold tracking-wide",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-wide text-accent uppercase",
								children: copy[r.id].role
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: copy[r.id].name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: copy[r.id].bio
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, { genres: r.genres }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-auto flex flex-wrap gap-2 pt-4",
								children: r.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialChip, { link: l }, l.href))
							})
						]
					})]
				}, r.id))
			})
		]
	});
}
function QuickActions() {
	const { t } = useI18n();
	const downloadM3u = () => {
		const m3u = `#EXTM3U\n#EXTINF:-1,VOL DANCE Radio\n${STREAM_URL}`;
		const blob = new Blob([m3u], { type: "audio/x-mpegurl" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "voldance.m3u";
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold tracking-wide uppercase",
				children: t("quickTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 mb-5 text-sm text-muted",
				children: t("quickLead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid flex-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestDialog, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg bg-primary px-4 py-6 text-center text-primary-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold uppercase",
							children: t("quickRequest")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] opacity-80",
							children: t("quickRequestHint")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: downloadM3u,
					className: "flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-6 text-center text-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold uppercase",
							children: t("quickM3u")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] opacity-80",
							children: t("quickM3uHint")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 inline-flex items-center gap-2 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3.5 text-primary" }),
					t("quickFoot"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/request",
						className: "text-foreground underline decoration-border underline-offset-2",
						children: t("quickFootLink")
					}),
					"."
				]
			})
		]
	});
}
function ChatPanel() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "chat",
		className: "rounded-xl border border-border bg-card p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { className: "size-4 text-primary" }), t("chatTitle")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-lg border border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: t("chatIframe"),
					src: CBOX_SRC,
					className: "block h-80 w-full border-0"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					t("chatFoot"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/rules",
						className: "underline decoration-border underline-offset-2",
						children: t("chatRules")
					}),
					"."
				]
			})
		]
	});
}
function HomePage() {
	(0, import_react.useEffect)(() => {
		const hash = window.location.hash.replace("#", "");
		if (!hash) return;
		const id = window.setTimeout(() => scrollToHash(hash), 40);
		return () => window.clearTimeout(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowPlaying, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreRibbon, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResidentsSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
