import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import { AvailableFonts, poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Resume Creator | Calvin Yuen",
  description:
    "The Resume Creator is an innovative tool that simplifies the process of crafting professional resumes. With user-friendly templates and customizable options, it empowers individuals to showcase their skills, experience, and achievements effectively. Say goodbye to the hassle of formatting and let the Resume Creator elevate your job application to new heights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={poppins.className}>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
