import type { Metadata } from 'next'
import './globals.css'
import NavbarClient from '@/components/NavbarClient'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'BilancoSkor — Bilanço Skorunuzu Öğrenin',
  description: 'Mizanınızı yükleyin, bankanın sizi nasıl gördüğünü öğrenin.',
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
