import UserProvider from "@/providers/UserProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import ColorModeProvider from "@/providers/ColorModeProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Player from "@/components/Player";

import "./globals.css";


export const metadata = {
  title: "Podsense.net",
  description: "Listen to podcasts!",
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
            <Sidebar>
              <Header>{children}</Header>
            </Sidebar>
            <Player />
          </UserProvider>
          </ColorModeProvider>
      </body>
    </html>
  );
}
