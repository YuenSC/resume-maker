import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import { AvailableFonts, nunito } from "@/lib/fonts";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "Resume Creator | Calvin Yuen",
  description:
    "The Resume Creator is an innovative tool that simplifies the process of crafting professional resumes. With user-friendly templates and customizable options, it empowers individuals to showcase their skills, experience, and achievements effectively. Say goodbye to the hassle of formatting and let the Resume Creator elevate your job application to new heights.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={params.locale} className={nunito.className}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <main>{children}</main>
          <Toaster />
        </NextIntlClientProvider>
      </body>
      {/* https://analytics.google.com/analytics/web/#/a238846227p328978317/admin/account/create */}
      <GoogleAnalytics gaId="G-84NGE1TSPX" />
    </html>
  );
}
