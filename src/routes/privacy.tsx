import { createFileRoute, Link } from "@tanstack/react-router";
import { TELEGRAM_CHANNEL } from "@/lib/constants";
import { AppShell } from "@/components/app-shell";
import { LegalDoc } from "@/components/legal-doc";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  const { locale } = useI18n();
  return <AppShell>{locale === "en" ? <PrivacyEn /> : <PrivacyUk />}</AppShell>;
}

function PrivacyUk() {
  return (
    <LegalDoc
      kicker="Закон України № 2297-VI"
      title="Політика щодо персональних даних"
      updated="05.09.2026"
    >
      <p>
        Ця політика пояснює, які дані обробляє аматорська інтернет-радіостанція VOL DANCE
        (володілець / розпорядник — адміністрація проєкту, м. Волочиськ, Хмельницька область)
        відповідно до Закону України «Про захист персональних даних» № 2297-VI та Закону України
        «Про інформацію» № 2657-XII.
      </p>
      <h2>1. Які дані ми обробляємо</h2>
      <ul>
        <li>
          <strong className="text-foreground">Замовлення треку:</strong> ім’я або нік, назва
          треку, текст повідомлення в ефір — лише якщо ви їх самі надсилаєте.
        </li>
        <li>
          <strong className="text-foreground">Чат:</strong> нік і повідомлення обробляє сервіс
          Cbox (третя сторона) за власними правилами.
        </li>
        <li>
          <strong className="text-foreground">Технічні:</strong> гучність плеєра, позначка згоди,
          реакції на трек, мова інтерфейсу — у локальному сховищі вашого браузера.
        </li>
        <li>
          <strong className="text-foreground">Погода:</strong> запит до Open-Meteo з координатами
          Волочиська (не ваша геолокація).
        </li>
      </ul>
      <p>Ми не збираємо паспортні дані, ІПН, платіжні реквізити чи спеціальні категорії даних.</p>
      <h2>2. Мета і правова підстава</h2>
      <p>
        Мета: забезпечення аматорського ефіру, розгляд замовлень, робота чату, запам’ятовування
        технічних налаштувань. Підстава: ваш добровольчий запит (ст. 11 Закону № 2297-VI) та
        законний інтерес у підтримці роботи сайту. Безоплатний аматорський сервіс не є споживчим
        договором з обов’язковою ідентифікацією.
      </p>
      <h2>3. Кому передаємо</h2>
      <ul>
        <li>адміністрації ефіру — зміст замовлення (ім’я, трек, повідомлення);</li>
        <li>Cbox, myTuner, Globalic — якщо ви користуєтесь їхніми віджетами;</li>
        <li>хостинг-провайдеру сайту — технічні журнали запитів.</li>
      </ul>
      <p>
        Ідентифікатори службових каналів зв’язку адміністрації в публічний код сайту не
        виводяться. Передача за межі України можлива лише в межах роботи зазначених хмарних
        віджетів.
      </p>
      <h2>4. Строк зберігання</h2>
      <p>
        Замовлення зберігаються стільки, скільки потрібно для поставлення в ефір, і не довше ніж
        30 днів, якщо інше не вимагає закон. Дані в браузері ви можете стерти самостійно.
      </p>
      <h2>5. Ваші права</h2>
      <p>
        Ви маєте права, передбачені статтею 8 Закону № 2297-VI: знати про джерела, мету і місце
        обробки, отримувати інформацію, заперечувати проти обробки, вимагати зміну чи знищення
        недостовірних даних, захист у суді. Для звернення напишіть у{" "}
        <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">
          Telegram-канал VOL DANCE
        </a>
        .
      </p>
      <h2>6. Cookies</h2>
      <p>
        Станція використовує технічне локальне сховище (гучність, згода, реакції, мова). Віджет
        чату Cbox може встановлювати власні cookies. Рекламних трекерів Станція не підключає.
      </p>
      <h2>7. Діти</h2>
      <p>
        Сервіс розрахований на осіб від 16 років. Якщо вам менше 16 років, користуйтесь сайтом
        лише за згодою батьків або піклувальників.
      </p>
      <h2>8. Зміни</h2>
      <p>
        Нова редакція публікується на цій сторінці. Див. також{" "}
        <Link to="/offer">публічну оферту</Link> та <Link to="/legal">правову інформацію</Link>.
      </p>
    </LegalDoc>
  );
}

function PrivacyEn() {
  return (
    <LegalDoc
      kicker="Ukraine Law No. 2297-VI"
      title="Personal data policy"
      updated="05.09.2026"
    >
      <p>
        This policy explains what data the amateur internet radio station VOL DANCE (controller /
        processor — the project administration, Volochysk, Khmelnytskyi region) processes under
        Ukraine’s Law on Personal Data Protection No. 2297-VI and the Law on Information No.
        2657-XII.
      </p>
      <h2>1. What we process</h2>
      <ul>
        <li>
          <strong className="text-foreground">Track requests:</strong> name or nickname, track
          title, on-air message — only if you send them yourself.
        </li>
        <li>
          <strong className="text-foreground">Chat:</strong> nickname and messages are processed
          by Cbox (a third party) under its own rules.
        </li>
        <li>
          <strong className="text-foreground">Technical:</strong> player volume, consent flag,
          track reactions and interface language — in your browser’s local storage.
        </li>
        <li>
          <strong className="text-foreground">Weather:</strong> a request to Open-Meteo using
          Volochysk coordinates (not your geolocation).
        </li>
      </ul>
      <p>
        We do not collect passport data, tax IDs, payment details or special categories of data.
      </p>
      <h2>2. Purpose and legal basis</h2>
      <p>
        Purpose: running the amateur air, reviewing requests, chat, remembering technical
        settings. Basis: your voluntary request (Article 11 of Law No. 2297-VI) and a legitimate
        interest in keeping the site working. A free amateur service is not a consumer contract
        that requires identification.
      </p>
      <h2>3. Who we share with</h2>
      <ul>
        <li>the air administration — the content of a request (name, track, message);</li>
        <li>Cbox, myTuner, Globalic — if you use their widgets;</li>
        <li>the site hosting provider — technical request logs.</li>
      </ul>
      <p>
        Identifiers of the administration’s service channels are not exposed in public site code.
        Transfer outside Ukraine is possible only as part of those cloud widgets.
      </p>
      <h2>4. Retention</h2>
      <p>
        Requests are kept as long as needed to put them on air, and no longer than 30 days unless
        the law requires otherwise. You can clear browser data yourself.
      </p>
      <h2>5. Your rights</h2>
      <p>
        You have the rights under Article 8 of Law No. 2297-VI: to know the sources, purpose and
        place of processing, obtain information, object to processing, request correction or
        destruction of inaccurate data, and seek court protection. Write to the{" "}
        <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">
          VOL DANCE Telegram channel
        </a>
        .
      </p>
      <h2>6. Cookies</h2>
      <p>
        The Station uses technical local storage (volume, consent, reactions, language). The Cbox
        chat widget may set its own cookies. The Station does not connect advertising trackers.
      </p>
      <h2>7. Children</h2>
      <p>
        The service is intended for persons aged 16 and over. If you are under 16, use the site
        only with the consent of a parent or guardian.
      </p>
      <h2>8. Changes</h2>
      <p>
        A new edition is published on this page. See also the <Link to="/offer">public offer</Link>{" "}
        and the <Link to="/legal">legal notice</Link>.
      </p>
    </LegalDoc>
  );
}
