import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  // Here you would typically save the snippet to a database
  // For this example, we'll just return the received data
  return NextResponse.json({ message: 'Snippet created', snippet: body })
}