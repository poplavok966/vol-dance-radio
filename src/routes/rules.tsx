import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { LegalDoc } from "@/components/legal-doc";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/rules")({ component: RulesPage });

function RulesPage() {
  const { locale } = useI18n();
  return <AppShell>{locale === "en" ? <RulesEn /> : <RulesUk />}</AppShell>;
}

function RulesUk() {
  return (
    <LegalDoc kicker="Ефір і чат" title="Правила ефіру та чату" updated="05.09.2026">
      <p>
        Правила застосовуються до прослуховування, замовлення треків і спілкування в чаті VOL
        DANCE. Порушення може мати наслідком видалення повідомлення, ігнорування замовлення або
        обмеження доступу.
      </p>
      <h2>1. Замовлення треків</h2>
      <ul>
        <li>вказуйте виконавця і назву зрозуміло;</li>
        <li>не вимагайте негайного виходу в ефір — черга формується ведучим;</li>
        <li>не надсилайте спам і не дублюйте заявку частіше ніж раз на кілька хвилин;</li>
        <li>
          заборонені треки з явним закликом до насильства, дискримінації чи іншої протиправної
          діяльності.
        </li>
      </ul>
      <h2>2. Чат</h2>
      <ul>
        <li>спілкування українською або іншими мовами — без мови ворожнечі;</li>
        <li>
          заборонені образи, погрози, доксинг, порнографія, реклама сторонніх сервісів без згоди
          адміністрації;
        </li>
        <li>заборонено видавати себе за резидента чи адміністрацію Станції;</li>
        <li>чат обробляється сервісом Cbox; додатково діють їхні умови використання.</li>
      </ul>
      <h2>3. Авторське право</h2>
      <p>
        Не надсилайте посилання на нелегальні копії творів. Станція не надає файлів для
        завантаження музики. Права на твори — у правовласників.
      </p>
      <h2>4. Звук</h2>
      <p>
        Бережіть слух. Тривале прослуховування на високій гучності може зашкодити. Регулюйте
        гучність самостійно.
      </p>
      <h2>5. Контакт</h2>
      <p>
        Скарги на контент ефіру або чату — через офіційний Telegram-канал Станції. Адміністрація
        розглядає звернення в розумний строк.
      </p>
    </LegalDoc>
  );
}

function RulesEn() {
  return (
    <LegalDoc kicker="Air and chat" title="On-air and chat rules" updated="05.09.2026">
      <p>
        These rules apply to listening, track requests and chat on VOL DANCE. A breach may result
        in a message being removed, a request being ignored, or access being limited.
      </p>
      <h2>1. Track requests</h2>
      <ul>
        <li>state the artist and title clearly;</li>
        <li>do not demand an immediate play — the presenter sets the queue;</li>
        <li>do not spam or repeat a request more than once every few minutes;</li>
        <li>
          tracks that explicitly incite violence, discrimination or other unlawful activity are
          forbidden.
        </li>
      </ul>
      <h2>2. Chat</h2>
      <ul>
        <li>you may write in Ukrainian or other languages — no hate speech;</li>
        <li>
          insults, threats, doxxing, pornography and ads for other services without the
          administration’s consent are forbidden;
        </li>
        <li>do not impersonate a resident or the Station administration;</li>
        <li>chat is processed by Cbox; their terms also apply.</li>
      </ul>
      <h2>3. Copyright</h2>
      <p>
        Do not send links to illegal copies of works. The Station does not provide music files for
        download. Rights in the works remain with the rightholders.
      </p>
      <h2>4. Sound</h2>
      <p>
        Protect your hearing. Long listening at high volume can cause harm. Adjust the volume
        yourself.
      </p>
      <h2>5. Contact</h2>
      <p>
        Complaints about on-air or chat content go through the Station’s official Telegram
        channel. The administration reviews them within a reasonable time.
      </p>
    </LegalDoc>
  );
}
