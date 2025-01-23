import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import mapImg from "../../assets/Maps.png"

interface RentalDetailsProps {
  carName: string
  carType: string
  carImage: string
  orderNumber: string
}

export function RentalDetails({ carName, carType, carImage, orderNumber }: RentalDetailsProps) {
  return (
    <div className="bg-white rounded-[10px] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[18px] md:text-[20px] font-bold">Details Rental</h2>
        <span className="text-[14px] md:text-[16px] text-[#90A3BF]">#{orderNumber}</span>
      </div>

      <div className="h-[180px] md:h-[240px] bg-[#F6F7F9] rounded-[10px] mb-4 md:mb-6 overflow-hidden">
        <Image src={mapImg} alt="Map Image" layout="responsive" width={500} height={300} />
      </div>

      <div className="flex gap-4 items-center mb-4 md:mb-6">
        <Image
          src={carImage}
          alt={carName}
          width={100}
          height={42}
          className="rounded-[8px]"
        />
        <div>
          <h3 className="text-[16px] md:text-[20px] font-bold">{carName}</h3>
          <p className="text-[14px] md:text-[16px] text-[#90A3BF]">{carType}</p>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Pick-Up Section */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <input type="radio" name='pickdrop' className="text-[#3563E9]" />
            <span className="font-semibold text-[14px] md:text-[16px]">Pick - Up</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {/* Location Select */}
            <div>
              <label htmlFor="pick-location" className="block text-sm font-bold text-gray-700 mb-1">
                Locations
              </label>
              <Select defaultValue="Kota Semarang">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kota Semarang">Kota Semarang</SelectItem>
                  {/* More options */}
                </SelectContent>
              </Select>
            </div>
            
            {/* Date Select */}
            <div>
              <label htmlFor="pick-date" className="block text-sm font-bold text-gray-700 mb-1">
                Date
              </label>
              <Select defaultValue="20 July 2022">
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20 July 2022">20 July 2022</SelectItem>
                  {/* More options */}
                </SelectContent>
              </Select>
            </div>

            {/* Time Select */}
            <div>
              <label htmlFor="pick-time" className="block text-sm font-bold text-gray-700 mb-1">
                Time
              </label>
              <Select defaultValue="07:00">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="07:00">07:00</SelectItem>
                  {/* More options */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Drop-Off Section */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <input type="radio" name='pickdrop' className="text-[#3563E9]" />
            <span className="font-semibold text-[14px] md:text-[16px]">Drop - Off</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {/* Location Select */}
            <div>
              <label htmlFor="drop-location" className="block text-sm font-bold text-gray-700 mb-1">
                Locations
              </label>
              <Select defaultValue="Kota Semarang">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kota Semarang">Kota Semarang</SelectItem>
                  {/* More options */}
                </SelectContent>
              </Select>
            </div>

            {/* Date Select */}
            <div>
              <label htmlFor="drop-date" className="block text-sm font-bold text-gray-700 mb-1">
                Date
              </label>
              <Select defaultValue="21 July 2022">
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="21 July 2022">21 July 2022</SelectItem>
                  {/* More options */}
                </SelectContent>
              </Select>
            </div>

            {/* Time Select */}
            <div>
              <label htmlFor="drop-time" className="block text-sm font-bold text-gray-700 mb-1">
                Time
              </label>
              <Select defaultValue="01:00">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01:00">01:00</SelectItem>
                  {/* More options */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Total Rental Price Section */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#F3F5F7]">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-[14px] md:text-[16px] font-semibold">Total Rental Price</h4>
            <p className="text-[10px] md:text-[12px] text-[#90A3BF]">Overall price and includes rental discount</p>
          </div>
          <span className="text-[18px] md:text-[24px] font-bold">$80.00</span>
        </div>
      </div>
    </div>
  );
}

