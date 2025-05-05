import type React from "react"
import "@/app/globals.css"
import {ThemeProvider} from "@/components/theme-provider"

export const metadata = {
    title: "grtsinry43 - 全栈开发者",
    description: "grtsinry43的个人网站，全栈开发者，专注于Java/JavaScript，并正在转向Kotlin/TypeScript全栈。",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}
