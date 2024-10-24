"use client";

import React from "react";
import { motion } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { Maximize2, Edit, Trash2, Copy, Check, X } from "lucide-react";
import EditSnippetForm from "./EditSnippetForm";

interface Snippet {
  id: string;
  title: string;
  content: string;
  language: string;
  date: string;
  tags: string[];
  userId: string;
}

interface SnippetModalProps {
  snippet: Snippet;
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
  onSave: (updatedSnippet: Omit<Snippet, "id" | "userId">) => void;
  onDelete: () => void;
  onFullScreen: () => void;
}

const SnippetModal: React.FC<SnippetModalProps> = ({
  snippet,
  isEditing,
  onClose,
  onEdit,
  onSave,
  onDelete,
  onFullScreen,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[80vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{snippet.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-auto p-6 pt-0">
          {isEditing ? (
            <EditSnippetForm
              snippet={snippet}
              onSave={onSave}
              onCancel={() => onEdit()}
            />
          ) : (
            <Highlight
              theme={themes.dracula}
              code={snippet.content}
              language={snippet.language}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} p-4 rounded-md`} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          )}
        </div>
        <div className="p-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{snippet.date}</span>
            <div className="space-x-2">
              <button
                onClick={onFullScreen}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                title="Full Screen"
              >
                <Maximize2 size={20} />
              </button>
              <button
                onClick={onEdit}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                title="Edit"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={onDelete}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                title="Copy"
              >
                {isCopied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SnippetModal;
