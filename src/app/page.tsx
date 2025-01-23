import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { HeroSection } from "@/components/landingpage/herosection"
import { PickupSection } from "@/components/landingpage/pickupsection"
import { PopularCars } from "@/components/landingpage/popular-cars"
import { RecommendationCars } from "@/components/landingpage/recommendation-cars"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <PickupSection />
        <PopularCars  />
        <RecommendationCars />
      </main>
      
      <Footer />
    </div>
  )
}

