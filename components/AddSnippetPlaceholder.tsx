import React from 'react'
import { Plus } from 'lucide-react'

const AddSnippetPlaceholder: React.FC = () => {
  return (
    <div className="rounded-lg shadow-md p-6 bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:border-blue-500 transition-colors">
      <Plus size={40} className="text-gray-400" />
      <span className="text-gray-500 font-medium">Add New Snippet</span>
    </div>
  )
}

export default AddSnippetPlaceholder