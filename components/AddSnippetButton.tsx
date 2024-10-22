import React from 'react'
import { Plus } from 'lucide-react'

const AddSnippetButton: React.FC = () => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors">
      <Plus size={20} />
      <span>Add Snippet</span>
    </button>
  )
}

export default AddSnippetButton