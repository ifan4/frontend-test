import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { createContext } from 'react'
import Provider from '@/globalState/Provider'
import { Toaster } from "@/components/ui/toaster"

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ['latin'] })


export const metadata = {
  title: 'Untukmu.ai',
  description: 'Frontend test for untukmu.ai',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plus_Jakarta_Sans.className}>
        <Provider>
          {children}
        </Provider>
        <Toaster/>
      </body>
    </html>
  )
}
