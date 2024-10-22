"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <aside
            className={`bg-white p-6 shadow-md transition-all duration-300 ${
              isSidebarOpen ? "w-64" : "w-0"
            } md:w-64`}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">SnippetVault</h1>
              <button onClick={toggleSidebar} className="md:hidden">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {["JavaScript", "Python", "CSS", "HTML", "TypeScript"].map(
                (lang, index) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full bg-${
                        ["yellow", "blue", "pink", "orange", "blue"][index]
                      }-400`}
                    ></div>
                    <span>{lang}</span>
                  </div>
                )
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Tags</h2>
              {/* Add tags filter here */}
            </div>
          </aside>
          <main className="flex-1 p-6 overflow-auto">
            <div className="md:hidden mb-4">
              <button onClick={toggleSidebar}>
                <Menu size={24} />
              </button>
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
