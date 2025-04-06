import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gesturio',
  description: 'ASL application',
  icons: {
    icon: '/favicon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
