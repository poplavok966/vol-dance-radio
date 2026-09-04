import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useI18n } from "./router-PByhQ-U4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-doc-JsMXFb_1.js
var import_jsx_runtime = require_jsx_runtime();
function LegalDoc({ kicker, title, updated, children }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mb-12 rounded-xl border border-border bg-card p-6 sm:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.22em] text-primary uppercase",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-3xl font-semibold tracking-wide sm:text-4xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: t("legalUpdated", { date: updated })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "legal-body mt-8 space-y-4 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-wide [&_h2]:text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-2 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-primary",
					children: t("legalHome")
				})
			})
		]
	});
}
//#endregion
export { LegalDoc as t };
