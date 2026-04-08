import type { Metadata } from 'next'
import './globals.css'
import NavbarClient from '@/components/NavbarClient'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'BilancoSkor — Bilanço Skorunuzu Öğrenin',
  description: 'Mizanınızı yükleyin, bankanın sizi nasıl gördüğünü öğrenin. KOBİler için finansal analiz ve bilanço skorlama platformu.',
  keywords: ['bilanço skoru', 'finansal analiz', 'kredi skoru', 'mizan analizi', 'banka kredi', 'KOBİ finansal rapor'],
  authors: [{ name: 'BilancoSkor' }],
  metadataBase: new URL('https://www.bilancoskor.com'),
  openGraph: {
    title: 'BilancoSkor — Bilanço Skorunuzu Öğrenin',
    description: 'Mizanınızı yükleyin, bankanın sizi nasıl gördüğünü öğrenin. KOBİler için finansal analiz platformu.',
    url: 'https://www.bilancoskor.com',
    siteName: 'BilancoSkor',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'BilancoSkor — Bilanço Skorunuzu Öğrenin',
    description: 'Mizanınızı yükleyin, bankanın sizi nasıl gördüğünü öğrenin.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.bilancoskor.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18068999649"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18068999649');
          `}
        </Script>
        <NavbarClient />
        {children}
      </body>
    </html>
  )
}
