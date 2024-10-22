import SnippetGrid from "../components/SnippetGrid";
import AddSnippetButton from "../components/AddSnippetButton";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Snippets</h1>
        <AddSnippetButton />
      </div>
      <SnippetGrid />
    </div>
  );
}
