import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface Snippet {
  id: number;
  title: string;
  language: string;
  content: string;
  date: string;
}

interface SnippetCardProps {
  snippet: Snippet;
}

const languageColors: { [key: string]: string } = {
  javascript: "bg-yellow-200",
  python: "bg-blue-200",
  css: "bg-pink-200",
  html: "bg-orange-200",
  typescript: "bg-blue-300",
};

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const bgColor = languageColors[snippet.language] || "bg-gray-200";

  return (
    <div className={`rounded-lg shadow-md p-6 ${bgColor}`}>
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
        <button className="text-blue-500 hover:text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SnippetCard;
