"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { motion } from "framer-motion";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import SnippetModal from "./SnippetModal";
import { useRouter } from "next/navigation";

export interface Snippet {
  id: string;
  title: string;
  language: string;
  content: string;
  date: string;
  tags: string[];
  userId: string;
}

interface SnippetCardProps {
  snippet: Snippet;
  onUpdate: (updatedSnippet: Snippet) => void;
  onDelete: (id: string) => void;
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
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const bgColor = languageColors[snippet.language] || "bg-gray-200";
  const router = useRouter();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = `${window.location.origin}/snippet/${snippet.id}`;
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const handleOpenFullView = () => {
    router.push(`/snippet/${snippet.id}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedSnippet: Omit<Snippet, "id" | "userId">) => {
    onUpdate({ ...snippet, ...updatedSnippet });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className={`rounded-lg shadow-md overflow-hidden cursor-pointer relative`}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className={`${bgColor} p-4`}>
          <h2 className="text-xl font-semibold mb-2">{snippet.title}</h2>
          <div className="h-32 overflow-hidden">
            <Highlight
              theme={themes.dracula}
              code={snippet.content}
              language={snippet.language as any}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} text-sm`}
                  style={{
                    ...style,
                    background: "transparent",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {tokens.slice(0, 5).map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                  {tokens.length > 5 && <div>...</div>}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
        <div className="bg-white p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{snippet.date}</span>
            <div className="flex space-x-2">
              <button
                onClick={handleCopyLink}
                className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-colors"
                title="Copy link"
              >
                {isLinkCopied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <LinkIcon size={16} />
                )}
              </button>
              <button
                onClick={handleCopy}
                className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-colors"
                title="Copy snippet"
              >
                {isCopied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <SnippetModal
          snippet={snippet}
          isEditing={isEditing}
          onClose={() => {
            setIsModalOpen(false);
            setIsEditing(false);
          }}
          onEdit={handleEdit}
          onSave={handleSave}
          onDelete={() => {
            onDelete(snippet.id);
            setIsModalOpen(false);
          }}
          onFullScreen={handleOpenFullView}
        />
      )}
    </>
  );
};

export default SnippetCard;
