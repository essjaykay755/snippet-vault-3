"use client";

import React, { useState } from "react";
import SnippetCard, { Snippet } from "./SnippetCard";
import AddSnippetPlaceholder from "./AddSnippetPlaceholder";
import Modal from "./Modal";
import EditSnippetForm from "./EditSnippetForm";

const initialSnippets = [
  {
    id: 1,
    title: "React useEffect",
    language: "javascript",
    content: "useEffect(() => {\n  // Effect code here\n}, [dependencies])",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Python List Comprehension",
    language: "python",
    content: "new_list = [expression for item in iterable if condition]",
    date: "2023-05-16",
  },
  {
    id: 3,
    title: "CSS Flexbox",
    language: "css",
    content:
      ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
    date: "2023-05-17",
  },
];

const SnippetGrid: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(initialSnippets);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddSnippet = (newSnippet: Snippet) => {
    setSnippets([...snippets, newSnippet]);
    setIsAddModalOpen(false);
  };

  const handleUpdateSnippet = (updatedSnippet: Snippet) => {
    setSnippets(
      snippets.map((snippet) =>
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      )
    );
  };

  const handleDeleteSnippet = (id: number) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddSnippetPlaceholder onClick={() => setIsAddModalOpen(true)} />
        {snippets.map((snippet) => (
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
