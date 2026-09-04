import { o as TELEGRAM_CHANNEL } from "./constants-CieyzSWs.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useI18n } from "./router-PByhQ-U4.mjs";
import { t as AppShell } from "./app-shell-XHkgJdrw.mjs";
import { t as LegalDoc } from "./legal-doc-JsMXFb_1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-CGWf690a.js
var import_jsx_runtime = require_jsx_runtime();
function LegalPage() {
	const { locale } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: locale === "en" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalEn, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalUk, {}) });
}
function LegalUk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalDoc, {
		kicker: "Ідентифікація",
		title: "Правова інформація",
		updated: "05.09.2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1. Хто ми" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Назва проєкту:"
				}), " VOL DANCE Radio"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Формат:"
				}), " аматорська некомерційна інтернет-радіостанція танцювальної музики (house / club)"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Місце:"
				}), " м. Волочиськ, Хмельницька область, Україна"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "Контакт:"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: TELEGRAM_CHANNEL,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "t.me/vol_dance_vol"
					})
				] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2. Закон України «Про медіа»" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "VOL DANCE не є телерадіоорганізацією, не користується радіочастотним ресурсом України і не заявляє про реєстрацію як суб’єкт у сфері медіа відповідно до Закону України «Про медіа» від 13 грудня 2022 року № 2849-IX. Це хобі-проєкт з інтернет-потоком. Якщо статус проєкту зміниться, ця сторінка буде оновлена." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "3. Авторське право і суміжні права" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Відносини щодо музичних творів регулюються Законом України «Про авторське право і суміжні права» № 2811-IX. Станція не передає користувачеві майнових прав на твори. Правовласники можуть надіслати обґрунтовану вимогу про обмеження спірного запису через Telegram-канал." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "4. Інформація та реклама" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Тексти сайту є інформацією про аматорський проєкт (Закон України «Про інформацію»). Реклама, якщо з’явиться, маркуватиметься згідно із Законом України «Про рекламу». На момент цієї редакції платна реклама на сайті не розміщується." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "5. Електронні комунікації" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Аудіопотік доставляється через мережу Інтернет. Станція не є постачальником електронних комунікаційних мереж чи послуг у розумінні Закону України «Про електронні комунікації»." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "6. Відповідальність користувача" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Користувач самостійно відповідає за зміст замовлень і повідомлень у чаті. Станція може видаляти контент, що порушує закон або ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/rules",
					children: "Правила ефіру"
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "7. Пов’язані документи" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/offer",
					children: "Публічна оферта"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					children: "Політика персональних даних"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/rules",
					children: "Правила ефіру та чату"
				}) })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs",
				children: "Ця сторінка не є індивідуальною правовою консультацією. Для оцінки обов’язків саме вашого проєкту зверніться до адвоката."
			})
		]
	});
}
function LegalEn() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalDoc, {
		kicker: "Identification",
		title: "Legal notice",
		updated: "05.09.2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1. Who we are" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Project name:"
				}), " VOL DANCE Radio"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Format:"
				}), " amateur non-commercial internet dance radio (house / club)"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Place:"
				}), " Volochysk, Khmelnytskyi region, Ukraine"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "Contact:"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: TELEGRAM_CHANNEL,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "t.me/vol_dance_vol"
					})
				] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2. Ukraine’s Media Law" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "VOL DANCE is not a broadcasting organisation, does not use Ukraine’s radio-frequency resource and does not claim registration as a media entity under the Law of Ukraine “On Media” of 13 December 2022 No. 2849-IX. It is a hobby project with an internet stream. If the project’s status changes, this page will be updated." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "3. Copyright and related rights" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Relations regarding musical works are governed by Ukraine’s Law on Copyright and Related Rights No. 2811-IX. The Station does not transfer economic rights in the works to the user. Rightholders may send a reasoned request to restrict a disputed recording via the Telegram channel." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "4. Information and advertising" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Site texts are information about an amateur project (Ukraine’s Law on Information). Any advertising, if introduced, will be labelled under Ukraine’s Law on Advertising. As of this edition, paid advertising is not placed on the site." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "5. Electronic communications" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The audio stream is delivered over the Internet. The Station is not a provider of electronic communications networks or services within the meaning of Ukraine’s Law on Electronic Communications." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "6. User responsibility" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"The user is solely responsible for the content of requests and chat messages. The Station may remove content that breaches the law or the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/rules",
					children: "On-air rules"
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "7. Related documents" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/offer",
					children: "Public offer"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					children: "Personal data policy"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/rules",
					children: "On-air and chat rules"
				}) })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs",
				children: "This page is not individual legal advice. For an assessment of your own project’s duties, consult a lawyer."
			})
		]
	});
}
//#endregion
export { LegalPage as component };
