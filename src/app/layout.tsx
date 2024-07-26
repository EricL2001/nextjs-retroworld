import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import './globals.css'  // Import global CSS
import { Inter } from 'next/font/google' // Import the Inter font from Google Fonts
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ['latin'] })  // Initialize the Inter font with the Latin subset

// Export metadata for the HTML document
// export const metadata = {
//   title: 'Flowmazon',
//   description: 'We make your wallet cry',
// }

export const metadata = {
  title: 'Retro World',
  description: 'We make you hip and your wallet cry',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className='p-4 max-w-7xl m-auto min-w-[300px]'>
            {children}
          </main>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  )
}
