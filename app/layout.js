import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "../utils/SessionProvider"
import { getServerSession } from "next-auth";
import Nav from "./components/Nav"
const inter = Inter({ subsets: ["latin"] });
import Credits from "./components/Credits"
export const metadata = {
  title: "Affirmly",
  description: "Creating Positive Affirmations",
    icons: {
      icon: '/affirmlyLogo.ico', // Path to your favicon in the public directory
    },
};

export default async  function RootLayout({ children }) {
const session = await getServerSession();
  return (
    <html lang="en">
         <SessionProvider session={session}>

        <body className={`${inter.className} z-auto`}>
      <Credits/>
      <Nav/>
      {children}</body>
         </SessionProvider>
    </html>
  );
}
