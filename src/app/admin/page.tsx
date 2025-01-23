import { Sidebar } from "@/components/admin/sidebar"
import { RentalDetails } from "@/components/admin/rental-details"
import { RentalStats } from "@/components/admin/rental-stats"
import { RecentTransactions } from "@/components/admin/recent-transaction"
import { Navbar } from "@/components/landingpage/navbar"
import car1 from "../../assets/car (1).png"
import car2 from "../../assets/Car (2).png"
import car3 from "../../assets/cardetail (main).png"
import car4 from "../../assets/HeroImg (1).png"

const statsData = [
  { label: "Sport Car", value: 17439, color: "#1A202C" },
  { label: "SUV", value: 9478, color: "#3563E9" },
  { label: "Coupe", value: 18197, color: "#54A6FF" },
  { label: "Hatchback", value: 12510, color: "#90A3BF" },
  { label: "MPV", value: 14406, color: "#C3D4E9" },
]

const recentTransactions = [
  {
    id: "1",
    carName: "Nissan GT - R",
    carType: "Sport Car",
    carImage: car1.src,
    date: "20 July",
    price: 80.00,
  },
  {
    id: "2",
    carName: "Koenigsegg",
    carType: "Sport Car",
    carImage: car2.src,
    date: "19 July",
    price: 99.00,
  },
  {
    id: "3",
    carName: "Lamborghini Aventador",
    carType: "Supercar",
    carImage: car3.src,
    date: "18 July",
    price: 120.00,
  },
  {
    id: "4",
    carName: "Ferrari 488 GTB",
    carType: "Supercar",
    carImage: car4.src,
    date: "17 July",
    price: 140.00,
  }
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <Sidebar />
      
      <div className="md:pl-[280px]">
        <main className="p-4 md:p-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-4 md:gap-8">
            <RentalDetails
              carName="Nissan GT - R"
              carType="Sport Car"
              carImage="/nissan-gtr.png"
              orderNumber="9761"
            />
            
            <div className="space-y-4 md:space-y-8">
              <RentalStats
                data={statsData}
                total={72030}
              />
              
              <RecentTransactions
                transactions={recentTransactions}
              />
            </div>
          </div>
        </main>
      </div>
      

    </div>
  )
}

