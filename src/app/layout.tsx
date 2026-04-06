import type { Metadata } from 'next'
import './globals.css'
import NavbarClient from '@/components/NavbarClient'

export const metadata: Metadata = {
  title: 'BilancoSkor — Bilanço Skorunuzu Öğrenin',
  description: 'Mizanınızı yükleyin, bankanın sizi nasıl gördüğünü öğrenin.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18068999649"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: \`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18068999649');
        \`
      }}
    />
      </head>
      <body>
        <NavbarClient />
        {children}
      </body>
    </html>
  )
}
