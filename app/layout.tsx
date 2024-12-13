import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/signin">
            <Button variant="default">SignIn</Button>
          </Link>
        </nav>
        <div>{children}</div>
        <div>{auth}</div>
      </body>
    </html>
  );
}
