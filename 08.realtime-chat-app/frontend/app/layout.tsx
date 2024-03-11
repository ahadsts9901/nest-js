import "./globals.css";
import { Providers } from "./redux/StorePovider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nestjs Chat App",
  description: "Created by Abdul Ahad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
