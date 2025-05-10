import type React from "react"
import "@/app/globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {getMessages} from 'next-intl/server';
import {routing} from "@/i18n/routing";

export const metadata = {
    title: "grtsinry43 - 全栈开发者",
    description: "grtsinry43的个人网站，全栈开发者，专注于Java/JavaScript，并正在转向Kotlin/TypeScript全栈。",
}

export default async function RootLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const {locale} = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
        <body>
        <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    )
}
