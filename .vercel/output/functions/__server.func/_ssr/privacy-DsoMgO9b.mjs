import { o as TELEGRAM_CHANNEL } from "./constants-CieyzSWs.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useI18n } from "./router-PByhQ-U4.mjs";
import { t as AppShell } from "./app-shell-XHkgJdrw.mjs";
import { t as LegalDoc } from "./legal-doc-JsMXFb_1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-DsoMgO9b.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	const { locale } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: locale === "en" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyEn, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyUk, {}) });
}
function PrivacyUk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalDoc, {
		kicker: "Закон України № 2297-VI",
		title: "Політика щодо персональних даних",
		updated: "05.09.2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ця політика пояснює, які дані обробляє аматорська інтернет-радіостанція VOL DANCE (володілець / розпорядник — адміністрація проєкту, м. Волочиськ, Хмельницька область) відповідно до Закону України «Про захист персональних даних» № 2297-VI та Закону України «Про інформацію» № 2657-XII." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1. Які дані ми обробляємо" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Замовлення треку:"
				}), " ім’я або нік, назва треку, текст повідомлення в ефір — лише якщо ви їх самі надсилаєте."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Чат:"
				}), " нік і повідомлення обробляє сервіс Cbox (третя сторона) за власними правилами."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Технічні:"
				}), " гучність плеєра, позначка згоди, реакції на трек, мова інтерфейсу — у локальному сховищі вашого браузера."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Погода:"
				}), " запит до Open-Meteo з координатами Волочиська (не ваша геолокація)."] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ми не збираємо паспортні дані, ІПН, платіжні реквізити чи спеціальні категорії даних." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2. Мета і правова підстава" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Мета: забезпечення аматорського ефіру, розгляд замовлень, робота чату, запам’ятовування технічних налаштувань. Підстава: ваш добровольчий запит (ст. 11 Закону № 2297-VI) та законний інтерес у підтримці роботи сайту. Безоплатний аматорський сервіс не є споживчим договором з обов’язковою ідентифікацією." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "3. Кому передаємо" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "адміністрації ефіру — зміст замовлення (ім’я, трек, повідомлення);" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cbox, myTuner, Globalic — якщо ви користуєтесь їхніми віджетами;" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "хостинг-провайдеру сайту — технічні журнали запитів." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ідентифікатори службових каналів зв’язку адміністрації в публічний код сайту не виводяться. Передача за межі України можлива лише в межах роботи зазначених хмарних віджетів." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "4. Строк зберігання" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Замовлення зберігаються стільки, скільки потрібно для поставлення в ефір, і не довше ніж 30 днів, якщо інше не вимагає закон. Дані в браузері ви можете стерти самостійно." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "5. Ваші права" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Ви маєте права, передбачені статтею 8 Закону № 2297-VI: знати про джерела, мету і місце обробки, отримувати інформацію, заперечувати проти обробки, вимагати зміну чи знищення недостовірних даних, захист у суді. Для звернення напишіть у",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: TELEGRAM_CHANNEL,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "Telegram-канал VOL DANCE"
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "6. Cookies" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Станція використовує технічне локальне сховище (гучність, згода, реакції, мова). Віджет чату Cbox може встановлювати власні cookies. Рекламних трекерів Станція не підключає." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "7. Діти" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Сервіс розрахований на осіб від 16 років. Якщо вам менше 16 років, користуйтесь сайтом лише за згодою батьків або піклувальників." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "8. Зміни" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Нова редакція публікується на цій сторінці. Див. також",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/offer",
					children: "публічну оферту"
				}),
				" та ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/legal",
					children: "правову інформацію"
				}),
				"."
			] })
		]
	});
}
function PrivacyEn() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalDoc, {
		kicker: "Ukraine Law No. 2297-VI",
		title: "Personal data policy",
		updated: "05.09.2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This policy explains what data the amateur internet radio station VOL DANCE (controller / processor — the project administration, Volochysk, Khmelnytskyi region) processes under Ukraine’s Law on Personal Data Protection No. 2297-VI and the Law on Information No. 2657-XII." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1. What we process" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Track requests:"
				}), " name or nickname, track title, on-air message — only if you send them yourself."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Chat:"
				}), " nickname and messages are processed by Cbox (a third party) under its own rules."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Technical:"
				}), " player volume, consent flag, track reactions and interface language — in your browser’s local storage."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Weather:"
				}), " a request to Open-Meteo using Volochysk coordinates (not your geolocation)."] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not collect passport data, tax IDs, payment details or special categories of data." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2. Purpose and legal basis" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Purpose: running the amateur air, reviewing requests, chat, remembering technical settings. Basis: your voluntary request (Article 11 of Law No. 2297-VI) and a legitimate interest in keeping the site working. A free amateur service is not a consumer contract that requires identification." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "3. Who we share with" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "the air administration — the content of a request (name, track, message);" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cbox, myTuner, Globalic — if you use their widgets;" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "the site hosting provider — technical request logs." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Identifiers of the administration’s service channels are not exposed in public site code. Transfer outside Ukraine is possible only as part of those cloud widgets." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "4. Retention" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Requests are kept as long as needed to put them on air, and no longer than 30 days unless the law requires otherwise. You can clear browser data yourself." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "5. Your rights" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"You have the rights under Article 8 of Law No. 2297-VI: to know the sources, purpose and place of processing, obtain information, object to processing, request correction or destruction of inaccurate data, and seek court protection. Write to the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: TELEGRAM_CHANNEL,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "VOL DANCE Telegram channel"
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "6. Cookies" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Station uses technical local storage (volume, consent, reactions, language). The Cbox chat widget may set its own cookies. The Station does not connect advertising trackers." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "7. Children" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The service is intended for persons aged 16 and over. If you are under 16, use the site only with the consent of a parent or guardian." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "8. Changes" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"A new edition is published on this page. See also the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/offer",
					children: "public offer"
				}),
				" ",
				"and the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/legal",
					children: "legal notice"
				}),
				"."
			] })
		]
	});
}
//#endregion
export { PrivacyPage as component };
