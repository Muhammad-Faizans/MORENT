import Image from "next/image"
import { StarRating } from "../car-detail/star-rating"
import { Button } from "@/components/ui/button"
import CarImg from "../../assets/Bitcoin.png" 

interface RentalSummaryProps {
  carName: string
  rating: number
  reviewCount: number
  subtotal: number
  tax: number
}

export function RentalSummary({ carName, rating, reviewCount, subtotal, tax }: RentalSummaryProps) {
  return (
    <div className="bg-white rounded-[10px] p-6">
      <h2 className="text-[20px] font-semibold text-[#1A202C] mb-4">Rental Summary</h2>
      <p className="text-[14px] text-[#90A3BF] mb-6">
        Prices may change depending on the length of the rental and the price of your rental car.
      </p>

      <div className="flex items-center gap-4 p-4 bg-[#F6F7F9] rounded-[10px] mb-6">
        <Image
          src={CarImg}
          alt={carName}
          width={132}
          height={56}
          className="rounded-[8px]"
        />
        <div>
          <h3 className="text-[20px] font-semibold mb-1">{carName}</h3>
          <div className="flex items-center gap-2">
            <StarRating rating={rating} />
            <span className="text-[14px] text-[#596780]">{reviewCount}+ Reviewer</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-[14px] text-[#90A3BF]">Subtotal</span>
          <span className="text-[16px] font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[14px] text-[#90A3BF]">Tax</span>
          <span className="text-[16px] font-semibold">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-[#C3D4E966] pt-6">
        <div>
          <h4 className="text-[16px] font-semibold">Total Rental Price</h4>
        </div>
        <span className="text-[24px] font-bold">${(subtotal + tax).toFixed(2)}</span>
      </div>
    </div>
  )
}

