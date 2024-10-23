"use client";

import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">SnippetVault</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              All Snippets
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              JavaScript
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700  rounded">
              Python
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              CSS
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              HTML
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              TypeScript
            </a>
          </li>
        </ul>
      </nav>
      {user && (
        <button
          onClick={handleSignOut}
          className="absolute bottom-4 left-4 flex items-center text-sm text-gray-300 hover:text-white"
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Sidebar;
