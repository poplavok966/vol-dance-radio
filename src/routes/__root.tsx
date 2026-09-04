import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppChrome } from "@/components/app-chrome";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VOL DANCE — Твоя танцювальна хвиля" },
      {
        name: "description",
        content:
          "VOL DANCE Radio — аматорська інтернет-радіостанція танцювальної музики. Live 24/7, Волочиськ.",
      },
      { name: "theme-color", content: "#0c0c10" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        children:
          "try{var s=localStorage.getItem('vd_theme');var t;if(s==='light'||s==='dark')t=s;else{var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var h=(new Date()).getHours();t=(d||h>=20||h<7)?'dark':'light'}if(t==='light')document.documentElement.classList.add('light')}catch(e){}",
      },
    ],
  }),
  component: () => (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <AppChrome>
            <Outlet />
          </AppChrome>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
