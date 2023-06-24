import Sidebar from "@/components/Sidebar";
import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getLikdPodcasts from "@/actions/getLikdPodcasts";
import Header from "@/components/Header";
import Player from "@/components/Player";

// import { Inter } from "next/font/google";
// const font = Inter({  subsets: ["latin"] });

export const metadata = {
  title: "Podsense.net",
  description: "Listen to podcasts!",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPodcasts = await getLikdPodcasts();
  return (
    <html lang="en">
      <body className={
        // font.className
        ""
        }>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider />
            <Sidebar podcasts={userPodcasts}>
            <Header />
            
            <div className="h-[calc(100%-96px)]">
            {children}
            </div>
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
