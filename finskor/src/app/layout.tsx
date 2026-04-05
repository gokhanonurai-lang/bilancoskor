import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinSkor — Bilanço Skorunuzu Öğrenin',
  description: 'Mizanınızı yükleyin, bankanın sizi nasıl gördüğünü öğrenin.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
