import UserProvider from "@/providers/UserProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import ColorModeProvider from "@/providers/ColorModeProvider";
import PageLayout from "@/components/PageLayout";

import "./globals.css";

export const metadata = {
  title: "Podsense.net",
  description:
    "Podcast experience supercharged with artificial intelligence. Podcast transcript, chatbot, searching, streaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="preload"
        href="/fonts/cal-sans.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <body>
        <ToasterProvider />
        <ColorModeProvider>
          <UserProvider>
            <PageLayout>{children}</PageLayout>
          </UserProvider>
        </ColorModeProvider>
      </body>
    </html>
  );
}
