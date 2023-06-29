import Sidebar from "@/components/Sidebar";
import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import Header from "@/components/Header";
import Player from "@/components/Player";

import "cal-sans";

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
      <body
        // className={
        //   font.className
        // }
      >
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider />
            <Sidebar >
              <Header>
                {children}
              </Header>
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
