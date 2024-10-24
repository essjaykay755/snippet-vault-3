"use client";

import React, { useState, useEffect } from "react";
import SnippetCard from "./SnippetCard";
import AddSnippetForm from "./AddSnippetForm";
import TopBar from "./TopBar";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";

interface SnippetGridProps {
  selectedLanguage: string | null;
  selectedTag: string | null;
}

const SnippetGrid: React.FC<SnippetGridProps> = ({
  selectedLanguage,
  selectedTag,
}) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isAddingSnippet, setIsAddingSnippet] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchSnippets();
  }, [user, selectedLanguage, selectedTag]);

  const fetchSnippets = async () => {
    if (!user) return;

    const snippetsRef = collection(db, "snippets");
    let q = query(snippetsRef, where("userId", "==", user.uid));

    if (selectedLanguage) {
      q = query(q, where("language", "==", selectedLanguage));
    }

    if (selectedTag) {
      q = query(q, where("tags", "array-contains", selectedTag));
    }

    const querySnapshot = await getDocs(q);
    const fetchedSnippets = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Snippet)
    );
    setSnippets(fetchedSnippets);
  };

  const handleAddSnippet = async (
    newSnippet: Omit<Snippet, "id" | "userId">
  ) => {
    if (!user) return;

    const snippetWithUser = { ...newSnippet, userId: user.uid };
    const docRef = await addDoc(collection(db, "snippets"), snippetWithUser);
    const addedSnippet = { id: docRef.id, ...snippetWithUser };
    setSnippets([...snippets, addedSnippet]);
    setIsAddingSnippet(false);
  };

  const handleUpdateSnippet = async (updatedSnippet: Snippet) => {
    await updateDoc(doc(db, "snippets", updatedSnippet.id), updatedSnippet);
    setSnippets(
      snippets.map((s) => (s.id === updatedSnippet.id ? updatedSnippet : s))
    );
  };

  const handleDeleteSnippet = async (id: string) => {
    await deleteDoc(doc(db, "snippets", id));
    setSnippets(snippets.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar onAddSnippet={() => setIsAddingSnippet(true)} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onUpdate={handleUpdateSnippet}
              onDelete={handleDeleteSnippet}
            />
          ))}
        </div>
      </div>
      {isAddingSnippet && (
        <AddSnippetForm
          onSave={handleAddSnippet}
          onClose={() => setIsAddingSnippet(false)}
        />
      )}
    </div>
  );
};

export default SnippetGrid;
