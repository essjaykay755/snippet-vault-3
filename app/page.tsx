"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SnippetGrid from "../components/SnippetGrid";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTags = async () => {
      if (user) {
        const snippetsRef = collection(db, "snippets");
        const q = query(snippetsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const allTags = querySnapshot.docs.flatMap(
          (doc) => doc.data().tags || []
        );
        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags);
      }
    };

    fetchTags();
  }, [user]);

  const handleFilterChange = (language: string | null) => {
    setSelectedLanguage(language);
  };

  const handleTagFilterChange = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <div className="flex">
      <Sidebar
        onFilterChange={handleFilterChange}
        onTagFilterChange={handleTagFilterChange}
        selectedLanguage={selectedLanguage}
        selectedTag={selectedTag}
        tags={tags}
      />
      <main className="flex-1 p-6">
        <SnippetGrid
          selectedLanguage={selectedLanguage}
          selectedTag={selectedTag}
        />
      </main>
    </div>
  );
};

export default Home;
