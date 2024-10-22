import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import Modal from "./Modal";
import EditSnippetForm from "./EditSnippetForm";
import { Edit, Trash2, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export interface Snippet {
  id: number;
  title: string;
  language: string;
  content: string;
  date: string;
}

interface SnippetCardProps {
  snippet: Snippet;
  onUpdate: (updatedSnippet: Snippet) => void;
  onDelete: (id: number) => void;
}

const languageColors: { [key: string]: string } = {
  javascript: "bg-yellow-200",
  python: "bg-blue-200",
  css: "bg-pink-200",
  html: "bg-orange-200",
  typescript: "bg-blue-300",
};

const SnippetCard: React.FC<SnippetCardProps> = ({
  snippet,
  onUpdate,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const bgColor = languageColors[snippet.language] || "bg-gray-200";

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedSnippet: Snippet) => {
    onUpdate(updatedSnippet);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(snippet.id);
    setIsModalOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <motion.div
        className={`rounded-lg shadow-md p-6 ${bgColor} cursor-pointer relative`}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-xl font-semibold mb-2">{snippet.title}</h2>
        <div className="mb-4 h-32 overflow-hidden">
          <Highlight
            theme={themes.dracula}
            code={snippet.content}
            language={snippet.language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className}
                style={{
                  ...style,
                  fontSize: "0.8rem",
                  background: "transparent",
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{snippet.date}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            {isCopied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isEditing ? (
          <EditSnippetForm
            snippet={snippet}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{snippet.title}</h2>
            <div className="mb-4 relative">
              <Highlight
                theme={themes.dracula}
                code={snippet.content}
                language={snippet.language}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={className}
                    style={{
                      ...style,
                      fontSize: "1rem",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                {isCopied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{snippet.date}</span>
              <div className="space-x-2">
                <button
                  onClick={handleEdit}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </Modal>
    </>
  );
};

export default SnippetCard;
