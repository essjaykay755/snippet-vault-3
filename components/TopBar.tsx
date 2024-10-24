import React from "react";
import AddSnippetButton from "./AddSnippetButton";

interface TopBarProps {
  onAddSnippet: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onAddSnippet }) => {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Snippets</h1>
      <AddSnippetButton onClick={onAddSnippet} />
    </div>
  );
};

export default TopBar;
