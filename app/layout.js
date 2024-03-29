import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/utils/SessionProvider"
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });
const session = await getServerSession();
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <SessionProvider session={session}>

      <body className={inter.className}>{children}</body>
         </SessionProvider>
    </html>
  );
}
