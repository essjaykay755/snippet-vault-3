'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import SnippetCard, { Snippet } from '../../../components/SnippetCard'
import { useAuth } from '../../../contexts/AuthContext'

const SnippetPage: React.FC = () => {
  const { id } = useParams()
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchSnippet = async () => {
      if (typeof id === 'string') {
        const snippetDoc = await getDoc(doc(db, 'snippets', id))
        if (snippetDoc.exists()) {
          setSnippet({ id: snippetDoc.id, ...snippetDoc.data() } as Snippet)
        }
      }
    }

    fetchSnippet()
  }, [id])

  if (!snippet) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SnippetCard
        snippet={snippet}
        onUpdate={async (updatedSnippet) => {
          // Implement update logic
        }}
        onDelete={async () => {
          // Implement delete logic
        }}
      />
    </div>
  )
}

export default SnippetPage