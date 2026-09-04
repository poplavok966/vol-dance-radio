import { createFileRoute, Link } from "@tanstack/react-router";
import { TELEGRAM_CHANNEL } from "@/lib/constants";
import { AppShell } from "@/components/app-shell";
import { LegalDoc } from "@/components/legal-doc";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/legal")({ component: LegalPage });

function LegalPage() {
  const { locale } = useI18n();
  return <AppShell>{locale === "en" ? <LegalEn /> : <LegalUk />}</AppShell>;
}

function LegalUk() {
  return (
    <LegalDoc kicker="Ідентифікація" title="Правова інформація" updated="05.09.2026">
      <h2>1. Хто ми</h2>
      <ul>
        <li>
          <strong className="text-foreground">Назва проєкту:</strong> VOL DANCE Radio
        </li>
        <li>
          <strong className="text-foreground">Формат:</strong> аматорська некомерційна
          інтернет-радіостанція танцювальної музики (house / club)
        </li>
        <li>
          <strong className="text-foreground">Місце:</strong> м. Волочиськ, Хмельницька область,
          Україна
        </li>
        <li>
          <strong className="text-foreground">Контакт:</strong>{" "}
          <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">
            t.me/vol_dance_vol
          </a>
        </li>
      </ul>
      <h2>2. Закон України «Про медіа»</h2>
      <p>
        VOL DANCE не є телерадіоорганізацією, не користується радіочастотним ресурсом України і
        не заявляє про реєстрацію як суб’єкт у сфері медіа відповідно до Закону України «Про
        медіа» від 13 грудня 2022 року № 2849-IX. Це хобі-проєкт з інтернет-потоком. Якщо статус
        проєкту зміниться, ця сторінка буде оновлена.
      </p>
      <h2>3. Авторське право і суміжні права</h2>
      <p>
        Відносини щодо музичних творів регулюються Законом України «Про авторське право і суміжні
        права» № 2811-IX. Станція не передає користувачеві майнових прав на твори. Правовласники
        можуть надіслати обґрунтовану вимогу про обмеження спірного запису через Telegram-канал.
      </p>
      <h2>4. Інформація та реклама</h2>
      <p>
        Тексти сайту є інформацією про аматорський проєкт (Закон України «Про інформацію»).
        Реклама, якщо з’явиться, маркуватиметься згідно із Законом України «Про рекламу». На момент
        цієї редакції платна реклама на сайті не розміщується.
      </p>
      <h2>5. Електронні комунікації</h2>
      <p>
        Аудіопотік доставляється через мережу Інтернет. Станція не є постачальником електронних
        комунікаційних мереж чи послуг у розумінні Закону України «Про електронні комунікації».
      </p>
      <h2>6. Відповідальність користувача</h2>
      <p>
        Користувач самостійно відповідає за зміст замовлень і повідомлень у чаті. Станція може
        видаляти контент, що порушує закон або <Link to="/rules">Правила ефіру</Link>.
      </p>
      <h2>7. Пов’язані документи</h2>
      <ul>
        <li>
          <Link to="/offer">Публічна оферта</Link>
        </li>
        <li>
          <Link to="/privacy">Політика персональних даних</Link>
        </li>
        <li>
          <Link to="/rules">Правила ефіру та чату</Link>
        </li>
      </ul>
      <p className="text-xs">
        Ця сторінка не є індивідуальною правовою консультацією. Для оцінки обов’язків саме вашого
        проєкту зверніться до адвоката.
      </p>
    </LegalDoc>
  );
}

function LegalEn() {
  return (
    <LegalDoc kicker="Identification" title="Legal notice" updated="05.09.2026">
      <h2>1. Who we are</h2>
      <ul>
        <li>
          <strong className="text-foreground">Project name:</strong> VOL DANCE Radio
        </li>
        <li>
          <strong className="text-foreground">Format:</strong> amateur non-commercial internet
          dance radio (house / club)
        </li>
        <li>
          <strong className="text-foreground">Place:</strong> Volochysk, Khmelnytskyi region,
          Ukraine
        </li>
        <li>
          <strong className="text-foreground">Contact:</strong>{" "}
          <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">
            t.me/vol_dance_vol
          </a>
        </li>
      </ul>
      <h2>2. Ukraine’s Media Law</h2>
      <p>
        VOL DANCE is not a broadcasting organisation, does not use Ukraine’s radio-frequency
        resource and does not claim registration as a media entity under the Law of Ukraine “On
        Media” of 13 December 2022 No. 2849-IX. It is a hobby project with an internet stream. If
        the project’s status changes, this page will be updated.
      </p>
      <h2>3. Copyright and related rights</h2>
      <p>
        Relations regarding musical works are governed by Ukraine’s Law on Copyright and Related
        Rights No. 2811-IX. The Station does not transfer economic rights in the works to the
        user. Rightholders may send a reasoned request to restrict a disputed recording via the
        Telegram channel.
      </p>
      <h2>4. Information and advertising</h2>
      <p>
        Site texts are information about an amateur project (Ukraine’s Law on Information). Any
        advertising, if introduced, will be labelled under Ukraine’s Law on Advertising. As of this
        edition, paid advertising is not placed on the site.
      </p>
      <h2>5. Electronic communications</h2>
      <p>
        The audio stream is delivered over the Internet. The Station is not a provider of
        electronic communications networks or services within the meaning of Ukraine’s Law on
        Electronic Communications.
      </p>
      <h2>6. User responsibility</h2>
      <p>
        The user is solely responsible for the content of requests and chat messages. The Station
        may remove content that breaches the law or the <Link to="/rules">On-air rules</Link>.
      </p>
      <h2>7. Related documents</h2>
      <ul>
        <li>
          <Link to="/offer">Public offer</Link>
        </li>
        <li>
          <Link to="/privacy">Personal data policy</Link>
        </li>
        <li>
          <Link to="/rules">On-air and chat rules</Link>
        </li>
      </ul>
      <p className="text-xs">
        This page is not individual legal advice. For an assessment of your own project’s duties,
        consult a lawyer.
      </p>
    </LegalDoc>
  );
}
