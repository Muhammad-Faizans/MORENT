// import { NextResponse } from 'next/server'
// import { getServerSession } from "next-auth/next"
// import { client } from "@/sanity/lib/client"

// export async function POST(req: Request) {
//   const session = await getServerSession()

//   if (!session?.user) {
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
//   }

//   const body = await req.json()

//   try {
//     await client
//       .patch(`customer-${session.user.id}`)
//       .set({
//         name: body.name,
//         phoneNumber: body.phoneNumber,
//         address: body.address,
//         dateOfBirth: body.dateOfBirth,
//       })
//       .commit()

//     return NextResponse.json({ message: 'Profile updated successfully' })
//   } catch (error) {
//     console.error('Error updating profile:', error)
//     return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { client } from "@/sanity/lib/client"

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await req.json()
  const customerId = `customer-${session.user.id || session.user.email}`  // Use session.user.id or session.user.email

  console.log('Request body:', body)
  console.log('Customer ID:', customerId)

  try {
    const result = await client
      .patch(customerId)
      .set({
        name: body.name,
        phoneNumber: body.phoneNumber,
        address: body.address,
        dateOfBirth: body.dateOfBirth,
      })
      .commit()

    console.log('Profile updated:', result)

    return NextResponse.json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
