import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Finca La Riberita - Tu lugar para eventos especiales",
  description: "Descubre Finca La Riberita, un espacio único para bodas, eventos corporativos y celebraciones privadas con vistas impresionantes y servicio excepcional.",
  keywords: "finca eventos, bodas, eventos corporativos, celebraciones, Madrid",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error('Failed to load messages:', error);
    messages = {};
  }
  
  return (
    <html lang={locale} className={cormorantGaramond.variable}>
      <body className={cormorantGaramond.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}