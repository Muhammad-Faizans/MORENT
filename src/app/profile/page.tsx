import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/landingpage/navbar"
import { client } from "@/sanity/lib/client"
import { CustomerProfileForm } from "@/components/profile/customer-profile-form"
import { BookingHistory } from "@/components/landingpage/booking-history"

// async function getCustomerData(userId: string) {
//   return client.fetch(
//     `*[_type == "customer" && _id == $userId][0]{
//     _id,
//     name,
//     email,
//     image,
//     phoneNumber,
//     address,
//     dateOfBirth,
//     createdAt,
//     "bookings": *[_type == "booking" && references(^._id)] | order(startDate desc) {
//       _id,
//       startDate,
//       endDate,
//       totalAmount,
//       status,
//       "car": car->{ name, image }
//     }
//   }`,
//     { userId: `customer-${userId}` },
//   )
// }

// export default async function ProfilePage() {
//   const session = await getServerSession()
//   console.log("session =>", session)  // Check session data
//   if (!session?.user) {
//     redirect("/auth/signin")
//   }
  
//   console.log("session.user.id =>", session.user.id)  // Verify userId

//   const customerData = await getCustomerData(session.user.id)
//   console.log("customerData =>", customerData)  // Verify customer data fetched


//   return (
//     <div className="min-h-screen bg-[#F6F7F9]">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Customer Profile</h1>
//         {customerData ? (
//           <>
//             <CustomerProfileForm initialData={customerData} />
//             <BookingHistory bookings={customerData.bookings} />
//           </>
//         ) : (
//           <p>No customer data available. Please try again later.</p>
//         )}
//       </main>
//     </div>
//   )
// }

async function getCustomerData(userEmail: string) {
  console.log("Fetching customer data for email:", userEmail);  // Debugging
  return client.fetch(
    `*[_type == "customer" && email == $userEmail][0]{
      _id,
      name,
      email,
      image,
      phoneNumber,
      address,
      dateOfBirth,
      createdAt,
      "bookings": *[_type == "booking" && references(^._id)] | order(startDate desc) {
        _id,
        startDate,
        endDate,
        totalAmount,
        status,
        "car": car->{ name, image }
      }
    }`,
    { userEmail }
  )
}

export default async function ProfilePage() {
  const session = await getServerSession()

  // Debugging: Log the session object
  console.log("Session data:", session)

  if (!session?.user?.email) {
    console.error("User email is missing");
    redirect("/auth/signin");
  }

  const customerData = await getCustomerData(session.user.email)

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customer Profile</h1>
        {customerData ? (
          <>
            <CustomerProfileForm initialData={customerData} />
            <BookingHistory bookings={customerData.bookings} />
          </>
        ) : (
          <p>No customer data available. Please try again later.</p>
        )}
      </main>
    </div>
  )
}
