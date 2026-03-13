import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyLens — AI Topic Explainer",
  description: "Get instant, student-friendly explanations for any study topic using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-bg">
        {children}
      </body>
    </html>
  );
}
