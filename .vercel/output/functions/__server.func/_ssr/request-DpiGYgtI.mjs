import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useI18n, d as useTheme } from "./router-BuAgjU6D.mjs";
import { t as AppShell } from "./app-shell-BhIoOvi2.mjs";
import { n as RequestFields } from "./request-form-SwnuLpLQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-DpiGYgtI.js
var import_jsx_runtime = require_jsx_runtime();
function RequestWidget() {
	const { theme } = useTheme();
	const { locale, t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		title: t("requestCatalog"),
		src: `/request-embed.html?theme=${theme}&lang=${locale}`,
		className: "h-[70vh] min-h-96 w-full rounded-lg border border-primary/40 bg-secondary"
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
