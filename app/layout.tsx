import { Footer, Navbar } from '@/components'
import './globals.css'

export const metadata = {
  title: 'FoodSense',
  description: 'A gift to your senses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative bg-orange-300">
         <Navbar/>
        {children}</body>
      {/* <Footer/> */}
    </html>
  )
}
