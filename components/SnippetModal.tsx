"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { Maximize2, Edit, Trash2, Copy, Check, X, Save } from "lucide-react";

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
  onClose: () => void;
  onEdit: (updatedSnippet: Snippet) => void;
  onDelete: () => void;
  onFullScreen: () => void;
}

const SnippetModal: React.FC<SnippetModalProps> = ({
  snippet,
  onClose,
  onEdit,
  onDelete,
  onFullScreen,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSnippet, setEditedSnippet] = useState(snippet);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    onEdit(editedSnippet);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedSnippet((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditedSnippet((prev) => ({
      ...prev,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedSnippet.title}
                onChange={handleInputChange}
                className="text-2xl font-semibold w-full px-2 py-1 border border-gray-300 rounded-md"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{snippet.title}</h2>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-auto p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={editedSnippet.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="typescript">TypeScript</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={editedSnippet.content}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="preview"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preview
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <Highlight
                    theme={themes.dracula}
                    code={editedSnippet.content || "// Your code here"}
                    language={editedSnippet.language as any}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre
                        className={`${className} p-4`}
                        style={{ ...style, minHeight: "200px" }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span
                                key={key}
                                {...getTokenProps({ token, key })}
                              />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={editedSnippet.tags.join(", ")}
                  onChange={handleTagsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="h-full">
              <Highlight
                theme={themes.dracula}
                code={snippet.content || "// Your code here"}
                language={snippet.language as any}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={`${className} p-4 h-full`}
                    style={{ ...style, margin: 0 }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        <span className="text-gray-500 mr-4">{i + 1}</span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          )}
        </div>
        <div className="p-6 flex-shrink-0 border-t flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {new Date(snippet.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="space-x-2">
            <button
              onClick={onFullScreen}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              title="Full Screen"
            >
              <Maximize2 size={20} />
            </button>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  title="Save"
                >
                  <Save size={20} />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  title="Cancel"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                title="Edit"
              >
                <Edit size={20} />
              </button>
            )}
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
      </motion.div>
    </motion.div>
  );
};

export default SnippetModal;
