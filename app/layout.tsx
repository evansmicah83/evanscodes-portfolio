import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata: Metadata = {
  title: 'Evans Micah Portfolio',
  description: 'Mathematics & Computer Science Student | Software Developer | Analytical Problem Solver',
}

// viewport is exported separately in the Next 14+ app router
export const viewport = 'width=device-width, initial-scale=1'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Critical asset prioritization for faster initial rendering */}
        <link rel="preload" href="/edt5.jpg" as="image" />
        <link rel="preload" href="/logo/Evanscodes logo.png" as="image" />
        <link rel="preload" href="/smart-sale/smart-sale.png" as="image" />
        <link rel="preload" href="/CIRAS/ciras.png" as="image" />
        <link rel="preload" href="/Anony/anony.png" as="image" />
        <link rel="preload" href="/smart-sale/smart video.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/CIRAS/ciras video.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/Anony/anony video.mp4" as="video" type="video/mp4" />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}