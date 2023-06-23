import Sidebar from "@/components/Sidebar";
import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getLikdPodcasts from "@/actions/getLikdPodcasts";
import Header from "@/components/Header";

// import { Inter } from "next/font/google";
// const font = Inter({  subsets: ["latin"] });

export const metadata = {
  title: "Podcast",
  description: "Listen to podcast!",
};

export const revalidate = 0; // this means the page will be regenerated on every request & not be cached

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
            {children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
