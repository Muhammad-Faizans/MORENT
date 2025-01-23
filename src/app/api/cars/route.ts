import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const recommended = searchParams.get('recommended')
  
  let query = '*[_type == "car"]'
  if (recommended === 'true') {
    query += '[tags[] match "recommended"]'
  }
  
  try {
    const cars = await client.fetch(query)
    return NextResponse.json({ success: true, data: cars })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

export async function POST(request: Request) {
  // Handle POST request
}

// Add PUT and DELETE handlers as needed

