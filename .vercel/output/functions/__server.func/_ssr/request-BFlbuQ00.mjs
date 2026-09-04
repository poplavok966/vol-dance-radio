import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useI18n, d as useTheme } from "./router-PByhQ-U4.mjs";
import { t as AppShell } from "./app-shell-XHkgJdrw.mjs";
import { n as RequestFields } from "./request-form-BuHW4ehm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-BFlbuQ00.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RequestWidget() {
	const { theme } = useTheme();
	const { locale, t } = useI18n();
	const [height, setHeight] = (0, import_react.useState)(760);
	(0, import_react.useEffect)(() => {
		const onMsg = (event) => {
			if (event.data?.type !== "vd-req-h") return;
			const next = Number(event.data.h);
			if (Number.isFinite(next) && next > 200) setHeight(Math.min(Math.max(Math.round(next) + 12, 480), 2200));
		};
		window.addEventListener("message", onMsg);
		return () => window.removeEventListener("message", onMsg);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		title: t("requestCatalog"),
		src: `/request-embed.html?theme=${theme}&lang=${locale}`,
		className: "w-full overflow-hidden rounded-lg border border-primary/40 bg-secondary",
		style: { height }
	});
}
function RequestPage() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-10 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold tracking-[0.22em] text-primary uppercase",
					children: t("requestKicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-4xl font-semibold tracking-wide",
					children: t("requestTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
					children: [
						t("requestLead"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/rules",
							className: "text-foreground underline decoration-border underline-offset-2",
							children: t("requestRules")
						}),
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestWidget, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold tracking-wide",
						children: t("requestShort")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: t("requestShortLead")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestFields, {})
				]
			})
		]
	}) });
}
//#endregion
export { RequestPage as component };
