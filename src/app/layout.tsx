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
      <body>
        <NavbarClient />
        {children}
      </body>
    </html>
  )
}
