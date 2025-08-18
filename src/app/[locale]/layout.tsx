import './globals.css';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import Nav from '../../component/Nav';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <head>
        <title>Task 6. Next.js. Server Side Rendering</title>
        <meta
          name="description"
          content="Task 6. Next.js. Server Side Rendering"
        />
      </head>
      <body>
        <div id="root">
          <NextIntlClientProvider>
            <StoreProvider>
              <ThemeProvider>
                <Nav params={locale}></Nav>
                {children}
              </ThemeProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
