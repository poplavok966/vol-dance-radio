import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { LegalDoc } from "@/components/legal-doc";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/offer")({ component: OfferPage });

function OfferPage() {
  const { locale } = useI18n();
  return <AppShell>{locale === "en" ? <OfferEn /> : <OfferUk />}</AppShell>;
}

function OfferUk() {
  return (
    <LegalDoc kicker="Цивільний кодекс України" title="Публічна оферта" updated="05.09.2026">
      <p>
        Цей документ є публічною офертою в розумінні статей 633, 641, 642 Цивільного кодексу
        України щодо безоплатного користування вебсайтом та аудіопотоком аматорської
        інтернет-радіостанції VOL DANCE (далі — Станція).
      </p>
      <h2>1. Акцепт</h2>
      <p>
        Початок прослуховування потоку, надсилання замовлення треку, використання чату або
        продовження перегляду сайту після появи повідомлення про cookies вважається акцептом
        оферти. Якщо ви не згодні — припиніть користування сервісом.
      </p>
      <h2>2. Предмет</h2>
      <p>
        Станція надає безоплатний доступ до аматорського інтернет-потоку танцювальної музики,
        сторінок сайту, форми замовлення треків та чату. Послуга не є телекомунікаційною послугою
        оператора, не є платним цифровим контентом і не є ліцензованим радіомовленням.
      </p>
      <h2>3. Статус Станції</h2>
      <p>
        VOL DANCE є аматорським некомерційним проєктом. Станція не заявляє про статус суб’єкта у
        сфері медіа згідно із Законом України «Про медіа» № 2849-IX, не має присвоєння
        радіочастот і не здійснює ефірного мовлення в смугах радіочастот загального користування.
      </p>
      <h2>4. Безоплатність</h2>
      <p>
        Користування сервісом безоплатне. Станція не збирає оплату за прослуховування. Реквізити
        для оплати послуг на сайті не публікуються. Добровільна підтримка, якщо з’явиться,
        оформлюється окремо і не є умовою доступу.
      </p>
      <h2>5. Інтелектуальна власність</h2>
      <ol>
        <li>
          Дизайн сайту, логотип VOL DANCE та тексти сторінок належать Станції, крім матеріалів
          третіх осіб.
        </li>
        <li>
          Авторські права і суміжні права на музичні твори, фонограми та виконання належать їх
          правовласникам. Користувач не отримує ліцензії на копіювання, завантаження чи публічне
          сповіщення творів поза межами прослуховування потоку на сайті.
        </li>
        <li>
          Претензії правовласників приймаються через Telegram-канал Станції. Станція сприяє
          оперативному обмеженню спірного контенту.
        </li>
      </ol>
      <h2>6. Обов’язки користувача</h2>
      <ul>
        <li>не порушувати законодавство України під час користування чатом і формою замовлення;</li>
        <li>не надсилати протиправний, образливий чи чужий персональний контент;</li>
        <li>не намагатися зламати, перевантажити чи скопіювати інфраструктуру потоку;</li>
        <li>
          дотримуватися <Link to="/rules">Правил ефіру</Link>.
        </li>
      </ul>
      <h2>7. Відмова від гарантій</h2>
      <p>
        Сервіс надається «як є». Станція не гарантує безперервність потоку, точність метаданих
        треків, доступність віджетів третіх осіб (myTuner, Cbox, Open-Meteo, Globalic). Збитки від
        користування сервісом відшкодовуються лише в межах, прямо передбачених імперативними
        нормами законодавства України.
      </p>
      <h2>8. Персональні дані</h2>
      <p>
        Обробка здійснюється згідно з <Link to="/privacy">Політикою персональних даних</Link> та
        Законом України «Про захист персональних даних» № 2297-VI.
      </p>
      <h2>9. Зміни</h2>
      <p>
        Станція може оновлювати оферту, публікуючи нову редакцію на цій сторінці. Продовження
        користування після оновлення є акцептом нової редакції.
      </p>
      <h2>10. Застосовне право</h2>
      <p>
        Застосовне право — право України. Спори вирішуються шляхом переговорів, а в разі
        недосягнення згоди — судами України за правилами підсудності.
      </p>
    </LegalDoc>
  );
}

function OfferEn() {
  return (
    <LegalDoc kicker="Civil Code of Ukraine" title="Public offer" updated="05.09.2026">
      <p>
        This document is a public offer within the meaning of Articles 633, 641 and 642 of the
        Civil Code of Ukraine on free use of the website and audio stream of the amateur internet
        radio station VOL DANCE (the “Station”).
      </p>
      <h2>1. Acceptance</h2>
      <p>
        Starting to listen to the stream, sending a track request, using the chat, or continuing to
        browse the site after the cookie notice appears constitutes acceptance of this offer. If
        you do not agree, stop using the service.
      </p>
      <h2>2. Subject</h2>
      <p>
        The Station provides free access to an amateur internet stream of dance music, website
        pages, a track-request form and chat. This is not a telecom operator service, not paid
        digital content and not licensed radio broadcasting.
      </p>
      <h2>3. Status of the Station</h2>
      <p>
        VOL DANCE is an amateur non-commercial project. The Station does not claim the status of a
        media entity under Ukraine’s Media Law No. 2849-IX, holds no radio-frequency assignment and
        does not broadcast in public radio-frequency bands.
      </p>
      <h2>4. No charge</h2>
      <p>
        Use of the service is free of charge. The Station does not collect payment for listening.
        Payment details are not published on the site. Any voluntary support, if introduced, is
        arranged separately and is not a condition of access.
      </p>
      <h2>5. Intellectual property</h2>
      <ol>
        <li>
          The site design, VOL DANCE logo and page texts belong to the Station, except for
          third-party materials.
        </li>
        <li>
          Copyright and related rights in musical works, phonograms and performances belong to
          their rightholders. The user receives no licence to copy, download or publicly
          communicate works beyond listening to the stream on the site.
        </li>
        <li>
          Rightholder claims are accepted via the Station’s Telegram channel. The Station will help
          promptly restrict disputed content.
        </li>
      </ol>
      <h2>6. User duties</h2>
      <ul>
        <li>not to violate Ukrainian law when using the chat and request form;</li>
        <li>not to send unlawful, abusive or other people’s personal content;</li>
        <li>not to attack, overload or copy the stream infrastructure;</li>
        <li>
          to follow the <Link to="/rules">On-air rules</Link>.
        </li>
      </ul>
      <h2>7. Disclaimer</h2>
      <p>
        The service is provided “as is”. The Station does not guarantee uninterrupted streaming,
        accuracy of track metadata or availability of third-party widgets (myTuner, Cbox,
        Open-Meteo, Globalic). Losses from using the service are recoverable only to the extent
        required by mandatory rules of Ukrainian law.
      </p>
      <h2>8. Personal data</h2>
      <p>
        Processing is carried out under the <Link to="/privacy">Personal data policy</Link> and
        Ukraine’s Law on Personal Data Protection No. 2297-VI.
      </p>
      <h2>9. Changes</h2>
      <p>
        The Station may update this offer by publishing a new edition on this page. Continued use
        after an update is acceptance of the new edition.
      </p>
      <h2>10. Governing law</h2>
      <p>
        The governing law is the law of Ukraine. Disputes are resolved by negotiation and, failing
        agreement, by the courts of Ukraine under the rules of venue.
      </p>
    </LegalDoc>
  );
}
