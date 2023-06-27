import Sidebar from "@/components/Sidebar";
import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getLikdPodcasts from "@/actions/getLikdPodcasts";
import Header from "@/components/Header";
import Player from "@/components/Player";

import { Inter } from "next/font/google";
const font = Inter({  subsets: ["latin"] });

export const metadata = {
  title: "Podsense.net",
  description: "Listen to podcasts!",
};

export const revalidte = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          font.className
        }
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
