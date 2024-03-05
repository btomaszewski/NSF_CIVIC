import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/util/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deaf-Map",
  description: "Hazard Mapping and Reporting for Deaf & HoH Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header Bar */}
        {/*<div className="flex h-10 items-center mx-auto bg-orange-500 rounded">
           <a className="mx-2">Deaf-Map</a>
          <div className="ml-4 flex items-baseline space-x-4"></div> 
  </div>*/}
        {/* <NavBar></NavBar> */}
        {children}
      </body>
    </html>
  );
}
