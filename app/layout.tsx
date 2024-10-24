import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SnippetVault",
  description: "Store and manage your code snippets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col md:flex-row min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
