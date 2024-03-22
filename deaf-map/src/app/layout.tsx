import type { Metadata } from "next";
import { Roboto, Open_Sans } from "next/font/google";

import "./globals.css";
import "@esri/calcite-components/dist/calcite/calcite.css";

// Local assets

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const open_sans = Open_Sans({
  weight: ["800", "600"],
  subsets: ["latin"],
  variable: "--font-open_sans",
});

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
      <body className={`${roboto.variable} ${open_sans.variable}`}>
        {/* Header Bar */}
        {/*<div className="flex h-10 items-center mx-auto bg-orange-500 rounded">
           <a className="mx-2">Deaf-Map</a>
          <div className="ml-4 flex items-baseline space-x-4"></div> 
  </div>*/}
        {/* <NavBar></NavBar> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
