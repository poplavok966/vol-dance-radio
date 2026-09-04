import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'VOL DANCE — Твоя танцювальна хвиля',
  description:
    'VOL DANCE Radio — цілодобовий потік найкращої танцювальної музики. Слухай live-ефір, замовляй треки та спілкуйся у чаті.',
}


export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101014',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={`${montserrat.variable} scroll-smooth bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
