import { Loader } from "@/components/ui/loader"
import { Navbar } from "@/components/landingpage/navbar"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </main>
    </div>
  )
}

