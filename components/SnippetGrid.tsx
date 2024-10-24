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
import { Plus } from "lucide-react";

interface SnippetGridProps {
  selectedLanguage: string | null;
  selectedTag: string | null;
}

const SnippetGrid: React.FC<SnippetGridProps> = ({
  selectedLanguage,
  selectedTag,
}) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "snippets"),
        where("userId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const snippetsData = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Snippet)
        );
        setSnippets(snippetsData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const filteredSnippets = snippets.filter(
    (snippet) =>
      (!selectedLanguage || snippet.language === selectedLanguage) &&
      (!selectedTag || snippet.tags.includes(selectedTag))
  );

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Snippets</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Snippet
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default SnippetGrid;
