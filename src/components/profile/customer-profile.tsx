import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Booking = {
  _id: string
  startDate: string
  endDate: string
  car: {
    name: string
    image: string
  }
}

type CustomerData = {
  name: string
  email: string
  image: string
  createdAt: string
  bookings: Booking[]
}

export function CustomerProfile({ customer }: { customer: CustomerData | null }) {
  if (!customer) {
    return <div>No customer data available.</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Image
            src={customer.image || "/placeholder.svg"}
            alt={customer.name || "Customer"}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{customer.name || "N/A"}</p>
            <p className="text-sm text-gray-500">{customer.email || "N/A"}</p>
            <p className="text-sm text-gray-500">Member since: {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          {customer.bookings && customer.bookings.length > 0 ? (
            <ul className="space-y-4">
              {customer.bookings.map((booking) => (
                <li key={booking._id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <Image
                    src={booking.car.image || "/placeholder.svg"}
                    alt={booking.car.name || "Car"}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <div>
                    <p className="font-semibold">{booking.car.name || "N/A"}</p>
                    <p className="text-sm text-gray-500">
                      {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "N/A"} - 
                      {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

