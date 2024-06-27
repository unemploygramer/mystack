import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "../utils/SessionProvider"
import { getServerSession } from "next-auth";
import Nav from "./components/Nav"
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async  function RootLayout({ children }) {
const session = await getServerSession();
  return (
    <html lang="en">
         <SessionProvider session={session}>

      <body className={inter.className}>
      <Nav/>
      {children}</body>
         </SessionProvider>
    </html>
  );
}
