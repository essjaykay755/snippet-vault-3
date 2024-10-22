import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import ClientAuthProvider from "../components/ClientAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientAuthProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </ClientAuthProvider>
      </body>
    </html>
  );
}
