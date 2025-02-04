"use client";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import Appbar from "@/components/appbar";
import { PostProvider } from "@/context/PostContext";
import { ArticleProvider } from "@/context/ArticleContext";
import { UserProfileProvider } from "@/context/UserProfileContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showAppbar = pathname !== "/search";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} hide-scrollbar  antialiased`}
      >
        <Providers>
          <PostProvider>
            <ArticleProvider>
              <UserProfileProvider>
                {showAppbar && <Appbar />}
                {children}
              </UserProfileProvider>
            </ArticleProvider>
          </PostProvider>
        </Providers>
      </body>
    </html>
  );
}
