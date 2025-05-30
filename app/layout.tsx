import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { FavoritesProvider } from "./context/favorites-context"
import Navbar from "./components/NavBar"
import { Toaster } from "sonner"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YTS Movies",
  description: "Browse and discover movies from YTS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="py-6 border-t">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} YTS Movies. All rights reserved.
                </div>
              </footer>
            </div>
            <Toaster />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
