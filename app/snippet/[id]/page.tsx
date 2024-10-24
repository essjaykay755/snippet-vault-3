"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Highlight, themes } from "prism-react-renderer";
import { ArrowLeft, Copy, Check } from "lucide-react";

interface Snippet {
  id: string;
  title: string;
  content: string;
  language: string;
  date: string;
  tags: string[];
  userId: string;
}

interface SnippetPageProps {
  params: { id: string };
}

const SnippetPage: React.FC<SnippetPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      if (typeof id !== "string") return;
      const snippetDoc = await getDoc(doc(db, "snippets", id));
      if (snippetDoc.exists()) {
        setSnippet({ id: snippetDoc.id, ...snippetDoc.data() } as Snippet);
      }
    };

    fetchSnippet();
  }, [id]);

  const handleCopy = () => {
    if (snippet) {
      navigator.clipboard.writeText(snippet.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {snippet.title}
            </h1>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isCopied ? (
              <>
                <Check className="mr-2" size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2" size={16} />
                Copy
              </>
            )}
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <Highlight
              theme={themes.dracula}
              code={snippet.content}
              language={snippet.language as any}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} p-4 rounded-md`}
                  style={{ ...style, minHeight: "300px" }}
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
          <div className="px-4 py-4 sm:px-6 bg-gray-50">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {snippet.language}
                </span>
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(snippet.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SnippetPage;
