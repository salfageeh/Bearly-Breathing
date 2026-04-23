import type { Metadata, Viewport } from 'next'
import { Satisfy, Nunito, DynaPuff } from 'next/font/google'
import './globals.css'

const satisfy = Satisfy({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-satisfy',
  display: 'swap',
})

const dynaPuff = DynaPuff({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-dynapuff',
  display: 'swap',
})

const nunito = Nunito({
  weight: ['600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bearly Breathing',
  description: 'A guided breathing exercise app with Biscuit & Boba',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bearly Breathing',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#c8e8e0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satisfy.variable} ${nunito.variable} ${dynaPuff.variable}`} style={{ height: '100%', overflow: 'hidden' }}>
      <body style={{ height: '100%', margin: 0, overflow: 'hidden', position: 'relative' }}>
        {children}
      </body>
    </html>
  )
}
