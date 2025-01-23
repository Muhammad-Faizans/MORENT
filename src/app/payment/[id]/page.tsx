// import { Navbar } from "@/components/landingpage/navbar";
// import { Footer } from "@/components/landingpage/footer";
// import { StepIndicator } from "@/components/payment/step-indicator";
// import { FormInput } from "@/components/payment/form-input";
// import { RentalSummary } from "@/components/payment/rental-summary";
// import { PaymentMethod } from "@/components/payment/payment-method";
// import { Button } from "@/components/ui/button";
// import shieldImg from "../../assets/ic-security-safety.png";
// import { RentalInfo } from "@/components/payment/rental-info";
// import Image from "next/image";


// export default function PaymentPage() {
//   return (
//     <div className="min-h-screen bg-[#F6F7F9]">
//       <Navbar />

//       <main className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Right Column - Summary */}
//           <div className="lg:w-[436px] lg:flex-shrink-0 order-1 lg:order-2">
//             <div className="top-8">
//               <RentalSummary
//                 carName="Nissan GT - R"
//                 rating={4}
//                 reviewCount={440}
//                 subtotal={80.0}
//                 tax={0}
//               />
//             </div>
//           </div>

//           {/* Left Column - Form */}
//           <div className="flex-1 space-y-8 order-2 lg:order-1">
//             {/* Billing Info */}
//             <div className="bg-white rounded-[10px] p-6">
//               <StepIndicator
//                 currentStep={1}
//                 totalSteps={4}
//                 title="Billing Info"
//                 description="Please enter your billing info"
//               />
//               <div className="grid md:grid-cols-2 gap-6">
//                 <FormInput label="Name" placeholder="Your name" name="name" />
//                 <FormInput
//                   label="Phone Number"
//                   placeholder="Phone number"
//                   name="phone"
//                   type="tel"
//                 />
//                 <FormInput
//                   label="Address"
//                   placeholder="Address"
//                   name="address"
//                   className="md:col-span-2"
//                 />
//                 <FormInput
//                   label="Town/City"
//                   placeholder="Town or city"
//                   name="city"
//                   className="md:col-span-2"
//                 />
//               </div>
//             </div>

//             {/* Rental Info */}
//             <div className="bg-white rounded-[10px] p-6">
//               <StepIndicator
//                 currentStep={2}
//                 totalSteps={4}
//                 title="Rental Info"
//                 description="Please select your rental date"
//               />
//               <RentalInfo />
//             </div>

//             {/* Payment Method */}
//             <div className="bg-white rounded-[10px] p-6">
//               <StepIndicator
//                 currentStep={3}
//                 totalSteps={4}
//                 title="Payment Method"
//                 description="Please enter your payment method"
//               />
//               <PaymentMethod />
//             </div>

//             {/* Confirmation */}
//             <div className="bg-white rounded-[10px] p-6">
//               <StepIndicator
//                 currentStep={4}
//                 totalSteps={4}
//                 title="Confirmation"
//                 description="We are getting to the end. Just a few clicks and your rental is ready!"
//               />
//               <div className="space-y-4">
//                 <label className="flex items-start gap-2 cursor-pointer">
//                   <input type="checkbox" className="mt-1" />
//                   <span className="text-[14px] text-[#1A202C]">
//                     I agree with sending Marketing and newsletter emails. No
//                     spam, promised!
//                   </span>
//                 </label>
//                 <label className="flex items-start gap-2 cursor-pointer">
//                   <input type="checkbox" className="mt-1" />
//                   <span className="text-[14px] text-[#1A202C]">
//                     I agree with our terms and conditions and privacy policy.
//                   </span>
//                 </label>
//               </div>

//               <Button className="mt-6 h-[46px] bg-[#3563E9] hover:bg-[#2748BA]">
//                 Rent Now
//               </Button>

//               <div className="flex items-center gap-4 mt-6 text-[14px] text-[#90A3BF]">
//                 <Image src={shieldImg.src} alt="Shield" width={32} height={56} />
//               </div>
//               <div>
//                 <p className="font-semibold mt-2 text-[#1A202C]">
//                   All your data are safe
//                 </p>
//                 <p>
//                   We are using the most advanced security to provide you the
//                   best experience ever.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { PaymentForm } from "@/components/payment/payment-form"
import { Loader } from "@/components/ui/loader"
import { client } from "@/sanity/lib/client"

async function getCar(id: string) {
  return client.fetch(`*[_type == "car" && _id == $id][0]`, { id })
}

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session) {
    redirect("/auth/signin?callbackUrl=/payment/" + params.id)
  }

  const { id } = params // Destructure id from params
  const car = await getCar(id)

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Payment for {car.name}</h1>
        <Suspense fallback={<Loader />}>
          <PaymentForm car={car} userId={session.user.id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}



