import React, { useState } from 'react'
import { Snippet } from './SnippetCard'

interface EditSnippetFormProps {
  snippet?: Snippet
  onSave: (snippet: Snippet) => void
  onCancel: () => void
}

const EditSnippetForm: React.FC<EditSnippetFormProps> = ({ snippet, onSave, onCancel }) => {
  const [title, setTitle] = useState(snippet?.title || '')
  const [language, setLanguage] = useState(snippet?.language || '')
  const [content, setContent] = useState(snippet?.content || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: snippet?.id || Date.now(),
      title,
      language,
      content,
      date: snippet?.date || new Date().toISOString().split('T')[0]
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        >
          <option value="">Select a language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="typescript">TypeScript</option>
        </select>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default EditSnippetForm