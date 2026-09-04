import { o as TELEGRAM_CHANNEL } from "./constants-CieyzSWs.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Radio } from "../_libs/lucide-react.mjs";
import { a as useI18n, n as UaFlag, r as HashLink } from "./router-PByhQ-U4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-footer-CQ0OgReR.js
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	const { t } = useI18n();
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border pt-10 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-8 lg:flex-row lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 place-items-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg font-semibold tracking-wide italic",
						children: "VOL DANCE RADIO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] tracking-[0.18em] text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UaFlag, {}),
								" ",
								t("city"),
								" · ",
								t("uaShort"),
								" · 24/7"
							]
						})
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs leading-relaxed text-muted",
					children: t("footerAbout")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8 text-sm sm:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-semibold tracking-widest text-muted uppercase",
					children: t("footerAir")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashLink, {
							hash: "on-air",
							className: "hover:text-primary",
							children: t("listen")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/request",
							className: "hover:text-primary",
							children: t("requestTrack")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: TELEGRAM_CHANNEL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-primary",
							children: t("footerChannel")
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-semibold tracking-widest text-muted uppercase",
					children: t("footerLegal")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/offer",
							className: "hover:text-primary",
							children: t("footerOffer")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "hover:text-primary",
							children: t("footerPrivacy")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/rules",
							className: "hover:text-primary",
							children: t("footerRules")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/legal",
							className: "hover:text-primary",
							children: t("footerLegalInfo")
						})
					]
				})] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 text-[11px] leading-relaxed text-muted",
			children: [
				t("footerAccept"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/offer",
					className: "underline decoration-border underline-offset-2",
					children: t("footerOfferLow")
				}),
				". ",
				t("footerData"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					className: "underline decoration-border underline-offset-2",
					children: t("footerPolicy")
				}),
				". ",
				t("footerRights"),
				" © ",
				year,
				" ",
				t("footerCopy")
			]
		})]
	});
}
//#endregion
export { SiteFooter as t };
