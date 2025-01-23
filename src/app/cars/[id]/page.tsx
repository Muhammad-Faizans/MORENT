import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { FilterSidebar } from "@/components/category/sidebar"
import { ImageGallery } from "@/components/car-detail/image-gallery"
import { StarRating } from "@/components/car-detail/star-rating"
import { ReviewCard } from "@/components/car-detail/review-card"
import { CarCard } from "@/components/landingpage/car-card"
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import { Loader } from "@/components/ui/loader"
import { Suspense } from "react"
import { getServerSession } from "next-auth/next"
import { RentNowButton } from "@/components/payment/rent-now-button"
import { redirect } from "next/navigation"
import { toast } from "@/hooks/use-toast"

// async function getCar(id: string) {
//   return client.fetch(`*[_type == "car" && _id == $id][0]`, { id })
// }

// async function getRecommendedCars() {
//   return client.fetch('*[_type == "car" && "recommended" in tags][0...3]')
// }

// export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params
//   const car = await getCar(id)
//   const recommendedCars = await getRecommendedCars()

//   return (
//     <div className="min-h-screen bg-[#F6F7F9]">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="flex-1 space-y-8">
//             <Suspense fallback={<Loader />}>
//               <div className="flex flex-col lg:flex-row gap-8">
//                 <div className="w-full lg:w-1/2">
//                   <ImageGallery images={[{ id: 1, src: urlForImage(car.image).url(), alt: car.name }]} />
//                 </div>
//                 <div className="w-full lg:w-1/2">
//                   <div className="bg-white rounded-[10px] p-6">
//                     <div className="flex items-start justify-between mb-8">
//                       <div>
//                         <div className="flex items-center gap-4 mb-2">
//                           <h1 className="text-2xl md:text-[32px] font-bold">{car.name}</h1>
//                           <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <Heart className="h-5 w-5" />
//                           </Button>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <StarRating rating={4} size="md" />
//                           <span className="text-[#596780] text-sm md:text-[14px]">440+ Reviewer</span>
//                         </div>
//                       </div>
//                     </div>

//                     <p className="text-[#596780] text-sm md:text-[16px] leading-[180%] md:leading-[200%] mb-8">
//                       {car.description || "No description available."}
//                     </p>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
//                       <div>
//                         <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Type Car</p>
//                         <p className="font-semibold text-sm md:text-base">{car.type}</p>
//                       </div>
//                       <div>
//                         <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Capacity</p>
//                         <p className="font-semibold text-sm md:text-base">{car.seatingCapacity}</p>
//                       </div>
//                       <div>
//                         <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Transmission</p>
//                         <p className="font-semibold text-sm md:text-base">{car.transmission}</p>
//                       </div>
//                       <div>
//                         <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Fuel Capacity</p>
//                         <p className="font-semibold text-sm md:text-base">{car.fuelCapacity}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div>
//                         <span className="text-xl md:text-[28px] font-bold">${car.pricePerDay}</span>
//                         <span className="text-sm md:text-[16px] text-[#90A3BF]">/day</span>
//                         {car.originalPrice && (
//                           <p className="text-sm md:text-[16px] text-[#90A3BF] line-through">${car.originalPrice}</p>
//                         )}
//                       </div>
//                       <Link href={`/payment/${car._id}`}>
//                         <Button className="bg-[#3563E9] hover:bg-[#2748BA] h-10 md:h-14 px-4 md:px-8 text-sm md:text-base">
//                           Rent Now
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Suspense>

//             <Suspense fallback={<Loader />}>
//               <div className="bg-white rounded-[10px] p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-lg md:text-[20px] font-semibold">Reviews</h2>
//                   <span className="bg-[#3563E9] text-white text-xs md:text-[14px] px-2.5 py-1.5 rounded-[4px]">13</span>
//                 </div>

//                 <div className="divide-y divide-[#C3D4E966]">
//                   {car.reviews && car.reviews.map((review, index) => <ReviewCard key={index} {...review} />)}
//                 </div>

//                 <button className="w-full text-center text-[#90A3BF] mt-6 text-sm md:text-base">Show All</button>
//               </div>
//             </Suspense>

//             <Suspense fallback={<Loader />}>
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-base md:text-[16px] font-semibold">Recommendation Car</h2>
//                   <Link href="/category">
//                     <button className="text-[#3563E9] text-xs md:text-[14px] font-semibold">View All</button>
//                   </Link>
//                 </div>
//                 <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                   {recommendedCars.map((car) => (
//                     <CarCard key={car._id} {...car} image={urlForImage(car.image).url()} />
//                   ))}
//                 </div>
//               </div>
//             </Suspense>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }


async function getCar(id: string) {
  return client.fetch(`*[_type == "car" && _id == $id][0]`, { id })
}

async function getRecommendedCars() {
  return client.fetch('*[_type == "car" && "recommended" in tags][0...3]')
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()
  const { id } = params // Destructure id from params
  const car = await getCar(id)
  const recommendedCars = await getRecommendedCars()

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 space-y-8">
            <Suspense fallback={<Loader />}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                  <ImageGallery images={[{ id: 1, src: urlForImage(car.image).url(), alt: car.name }]} />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="bg-white rounded-[10px] p-6">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <h1 className="text-2xl md:text-[32px] font-bold">{car.name}</h1>
                          <Heart className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={4} size="md" />
                          <span className="text-[#596780] text-sm md:text-[14px]">440+ Reviewer</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#596780] text-sm md:text-[16px] leading-[180%] md:leading-[200%] mb-8">
                      {car.description || "No description available."}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Type Car</p>
                        <p className="font-semibold text-sm md:text-base">{car.type}</p>
                      </div>
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Capacity</p>
                        <p className="font-semibold text-sm md:text-base">{car.seatingCapacity}</p>
                      </div>
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Transmission</p>
                        <p className="font-semibold text-sm md:text-base">{car.transmission}</p>
                      </div>
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Fuel Capacity</p>
                        <p className="font-semibold text-sm md:text-base">{car.fuelCapacity}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl md:text-[28px] font-bold">${car.pricePerDay}</span>
                        <span className="text-sm md:text-[16px] text-[#90A3BF]">/day</span>
                        {car.originalPrice && (
                          <p className="text-sm md:text-[16px] text-[#90A3BF] line-through">${car.originalPrice}</p>
                        )}
                      </div>
                      <RentNowButton carId={car._id} isAuthenticated={!!session} />
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>

            <Suspense fallback={<Loader />}>
              <div className="bg-white rounded-[10px] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg md:text-[20px] font-semibold">Reviews</h2>
                  <span className="bg-[#3563E9] text-white text-xs md:text-[14px] px-2.5 py-1.5 rounded-[4px]">13</span>
                </div>

                <div className="divide-y divide-[#C3D4E966]">
                  {car.reviews && car.reviews.map((review, index) => <ReviewCard key={index} {...review} />)}
                </div>

                <button className="w-full text-center text-[#90A3BF] mt-6 text-sm md:text-base">Show All</button>
              </div>
            </Suspense>

            <Suspense fallback={<Loader />}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base md:text-[16px] font-semibold">Recommendation Car</h2>
                  <Link href="/category">
                    <button className="text-[#3563E9] text-xs md:text-[14px] font-semibold">View All</button>
                  </Link>
                </div>
                <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendedCars.map((car) => (
                    <CarCard key={car._id} {...car} image={urlForImage(car.image).url()} />
                  ))}
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}






