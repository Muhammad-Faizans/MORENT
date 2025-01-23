import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { client } from "@/sanity/lib/client"

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('image') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    const asset = await client.assets.upload('image', file)

    await client.patch(`customer-${session.user.id}`)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      })
      .commit()

    return NextResponse.json({ imageUrl: asset.url })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

