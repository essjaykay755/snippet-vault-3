'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <>
      <aside className={`bg-white p-6 shadow-md transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} md:w-64`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">SnippetVault</h1>
          <button onClick={toggleSidebar} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {['JavaScript', 'Python', 'CSS', 'HTML', 'TypeScript'].map((lang, index) => (
            <div key={lang} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full bg-${['yellow', 'blue', 'pink', 'orange', 'blue'][index]}-400`}></div>
              <span>{lang}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          {/* Add tags filter here */}
        </div>
      </aside>
      <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-50">
        <Menu size={24} />
      </button>
    </>
  )
}

export default Sidebar