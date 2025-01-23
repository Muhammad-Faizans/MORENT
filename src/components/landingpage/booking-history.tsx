import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"

interface Booking {
  _id: string
  startDate: string
  endDate: string
  totalAmount: number
  status: string
  car: {
    name: string
    image: any
  }
}

interface BookingHistoryProps {
  bookings: Booking[]
}

export function BookingHistory({ bookings }: BookingHistoryProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      {bookings && bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow p-4 flex items-center">
              <Image
                src={urlForImage(booking.car.image).url() || "/placeholder.svg"}
                alt={booking.car.name}
                width={100}
                height={60}
                className="rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold">{booking.car.name}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Total: ${booking.totalAmount}</p>
                <p className={`text-sm ${booking.status === "confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                  Status: {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No booking history available.</p>
      )}
    </div>
  )
}

