import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { client } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();

    // Ensure all required fields are provided
    if (!body.carId || !body.startDate || !body.endDate || !body.totalAmount || !body.userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const customerId = body.userId || `customer-${session.user.id}`; // Use userId from request body if provided

    const booking = await client.create({
      _type: "booking",
      customer: {
        _type: "reference",
        _ref: customerId,
      },
      car: {
        _type: "reference",
        _ref: body.carId,
      },
      startDate: body.startDate,
      endDate: body.endDate,
      totalAmount: body.totalAmount,
      status: "confirmed",
      paymentStatus: "pending", // Default payment status
    });

    return NextResponse.json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}


