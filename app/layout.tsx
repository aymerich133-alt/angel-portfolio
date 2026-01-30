import localFont from "next/font/local"
import "./globals.css"

const titleFont = localFont({
  src: "./fonts/Franchise-Free-Bold.otf",
  variable: "--font-title",
  display: "swap",
})

const bodyFont = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-body",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${titleFont.variable}
          ${bodyFont.variable}
          font-body
          min-h-screen
        `}
      >
        {children}
      </body>
    </html>
  )
}
