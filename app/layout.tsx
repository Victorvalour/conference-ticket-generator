import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description: "Generate your conference ticket for Techember Fest '25",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#02191D] bg-gradient-to-b `}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}

