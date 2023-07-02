import UserProvider from "@/providers/UserProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Player from "@/components/Player";

import "./globals.css";

// import { Inter } from "next/font/google";
// const font = Inter({  subsets: ["latin"] });

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
      <body
        // className={
        //   font.className
        // }
      >
        <ToasterProvider />
          <UserProvider>
            <Sidebar >
              <Header>
                {children}
              </Header>
            </Sidebar>
            <Player />
          </UserProvider>
      </body>
    </html>
  );
}
