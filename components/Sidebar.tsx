"use client";

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { LogOut, Menu, X, RefreshCw } from "lucide-react";

interface SidebarProps {
  onFilterChange: (language: string | null) => void;
  onTagFilterChange: (tag: string | null) => void;
  selectedLanguage: string | null;
  selectedTag: string | null;
  tags: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  onFilterChange,
  onTagFilterChange,
  selectedLanguage,
  selectedTag,
  tags,
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const languages = [
    { name: "All Snippets", value: null },
    { name: "JavaScript", value: "javascript" },
    { name: "Python", value: "python" },
    { name: "CSS", value: "css" },
    { name: "HTML", value: "html" },
    { name: "TypeScript", value: "typescript" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const clearFilters = () => {
    onFilterChange(null);
    onTagFilterChange(null);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white text-gray-800 rounded-md shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-40 md:z-0`}
      >
        <div className="bg-white text-gray-800 w-64 min-h-screen p-4 shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            SnippetVault
          </h1>
          <nav>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Languages</h2>
              <button
                onClick={() => onFilterChange(null)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <ul className="space-y-2 mb-6">
              {languages.map((lang) => (
                <li key={lang.value || "all"}>
                  <button
                    onClick={() => {
                      onFilterChange(lang.value);
                      setIsOpen(false);
                    }}
                    className={`flex items-center w-full text-left py-2 px-4 rounded ${
                      selectedLanguage === lang.value
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {lang.value && (
                      <span
                        className={`w-3 h-3 rounded-full mr-2 bg-${
                          lang.value === "javascript"
                            ? "yellow"
                            : lang.value === "python"
                            ? "blue"
                            : lang.value === "css"
                            ? "pink"
                            : lang.value === "html"
                            ? "orange"
                            : "blue"
                        }-400`}
                      ></span>
                    )}
                    {lang.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Tags</h2>
              <button
                onClick={() => onTagFilterChange(null)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <ul className="space-y-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <button
                    onClick={() => {
                      onTagFilterChange(tag);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left py-2 px-4 rounded ${
                      selectedTag === tag ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {user && (
            <button
              onClick={handleSignOut}
              className="absolute bottom-4 left-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
