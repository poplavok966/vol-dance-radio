import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { m as LoaderCircle, t as X } from "../_libs/lucide-react.mjs";
import { a as useI18n, c as cn, s as Button, u as sendTrackRequest } from "./router-BuAgjU6D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-form-SwnuLpLQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-xl", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-3 right-3 grid size-9 place-items-center rounded-full text-muted hover:bg-secondary hover:text-foreground",
			"aria-label": "Закрити",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-semibold tracking-wide uppercase", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-1 text-sm text-muted", className),
		...props
	});
}
function RequestDialog({ children }) {
	const { t } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("requestDialogTitle") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("requestDialogLead") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestFields, { onDone: () => setOpen(false) })
		] })]
	});
}
function RequestFields({ onDone }) {
	const { t } = useI18n();
	const [name, setName] = (0, import_react.useState)("");
	const [track, setTrack] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	const send = async () => {
		if (!track.trim()) return;
		setStatus("sending");
		setError("");
		try {
			await sendTrackRequest({ data: {
				name,
				track,
				message
			} });
			setStatus("sent");
			setName("");
			setTrack("");
			setMessage("");
			window.setTimeout(() => onDone?.(), 1200);
		} catch (e) {
			setStatus("error");
			const raw = e instanceof Error ? e.message : "";
			if (raw.includes("TRACK_REQUIRED")) setError(t("requestNeedTrack"));
			else if (raw.includes("RATE_LIMIT")) setError(t("requestWait"));
			else setError(t("requestFail"));
		}
	};
	if (status === "sent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-8 text-center text-sm font-semibold",
		children: t("requestThanks")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 space-y-3",
		onSubmit: (e) => {
			e.preventDefault();
			send();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase",
					children: t("requestName")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value),
					maxLength: 80,
					placeholder: t("requestNamePh"),
					className: "h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase",
					children: t("requestTrackLabel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: track,
					onChange: (e) => setTrack(e.target.value),
					required: true,
					rows: 3,
					maxLength: 200,
					placeholder: "Artist — Title",
					className: "w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase",
					children: t("requestMsg")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: message,
					onChange: (e) => setMessage(e.target.value),
					maxLength: 280,
					className: "h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				})]
			}),
			status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end gap-2 pt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: status === "sending" || !track.trim(),
					children: [status === "sending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), t("requestSend")]
				})
			})
		]
	});
}
//#endregion
export { RequestFields as n, RequestDialog as t };
