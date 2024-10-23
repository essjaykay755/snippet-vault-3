"use client";

import React, { useState, useEffect } from "react";
import SnippetCard, { Snippet } from "./SnippetCard";
import AddSnippetPlaceholder from "./AddSnippetPlaceholder";
import Modal from "./Modal";
import EditSnippetForm from "./EditSnippetForm";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "./SignIn";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const SnippetGrid: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "snippets"),
        where("userId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const snippetsData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Snippet, "id">;
          return { id: doc.id, ...data } as Snippet;
        });
        setSnippets(snippetsData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (selectedLanguage) {
      setFilteredSnippets(
        snippets.filter((snippet) => snippet.language === selectedLanguage)
      );
    } else {
      setFilteredSnippets(snippets);
    }
  }, [snippets, selectedLanguage]);

  const handleAddSnippet = async (
    newSnippet: Omit<Snippet, "id" | "userId">
  ) => {
    if (user) {
      await addDoc(collection(db, "snippets"), {
        ...newSnippet,
        userId: user.uid,
      });
      setIsAddModalOpen(false);
    }
  };

  const handleUpdateSnippet = async (updatedSnippet: Snippet) => {
    if (user) {
      const { id, ...snippetData } = updatedSnippet;
      await updateDoc(doc(db, "snippets", id), snippetData);
    }
  };

  const handleDeleteSnippet = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, "snippets", id));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <SignIn />;

  return (
    <>
      <div className="mb-4">
        <select
          value={selectedLanguage || ""}
          onChange={(e) => setSelectedLanguage(e.target.value || null)}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="typescript">TypeScript</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddSnippetPlaceholder onClick={() => setIsAddModalOpen(true)} />
        {filteredSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onUpdate={handleUpdateSnippet}
            onDelete={handleDeleteSnippet}
          />
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <EditSnippetForm
          onSave={handleAddSnippet}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default SnippetGrid;
