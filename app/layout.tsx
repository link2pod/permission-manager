import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavDropdown from '@/components/menu/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pod Permission Manager',
  description: 'Manage permissions of apps and files in your pod',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/** Drop-down menu showing login/logout, and link to managers */}
        <div className='fixed top-0 right-0 h-10 w-10 mr-4 mt-4 z-10'>
          <NavDropdown />
        </div>
        {children}
      </body>
    </html>
  )
}
