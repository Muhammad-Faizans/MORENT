import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get("term")

  if (!term) {
    return NextResponse.json({ error: "Search term is required" }, { status: 400 })
  }

  try {
    const cars = await client.fetch(
      `
      *[_type == "car" && name match $term + "*"] {
        _id,
        name,
        "image": image.asset->url
      }
    `,
      { term },
    )

    return NextResponse.json(cars)
  } catch (error) {
    console.error("Error searching cars:", error)
    return NextResponse.json({ error: "An error occurred while searching for cars" }, { status: 500 })
  }
}

