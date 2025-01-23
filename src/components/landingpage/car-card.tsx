import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import fuelcapacity from "../../assets/gas-station.png";
import capacityicon from "../../assets/profile-2user.png";
import transmissionicon from "../../assets/Car (icon).png";

interface CarCardProps {
  _id: string;
  name: string;
  type: string;
  image: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: number;
  originalPrice?: number;
}

export function CarCard({
  _id,
  name,
  type,
  image,
  fuelCapacity,
  transmission,
  seatingCapacity,
  pricePerDay,
  originalPrice,
}: CarCardProps) {
  return (
    <Link href={`/cars/${_id}`} className="block group">
      <div className="rounded-lg bg-white p-4 shadow-md h-auto flex flex-col justify-between group-hover:shadow-lg transition-shadow">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg truncate group-hover:text-blue-600 transition-colors">{name}</h3>
              <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">{type}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Adjusted Image Section */}
          <div className="my-4 h-[180px] relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              layout="fill"
              objectFit="contain" // Ensures the full car is visible
              className="rounded-lg"
            />
          </div>

          {/* Icons and Details */}
          <div className="grid grid-cols-3  text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Image src={fuelcapacity} alt="Fuel" width={20} height={20} />
              <span className="truncate">{fuelCapacity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={transmissionicon} alt="Transmission" width={20} height={20} />
              <span className="truncate">{transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={capacityicon} alt="Capacity" width={20} height={20} />
              <span className="truncate">{seatingCapacity}</span>
            </div>
          </div>
        </div>

        {/* Price and Rent Now Button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-black-600">PKR {pricePerDay}</span>
            <span className="text-sm text-gray-500"></span>
            {originalPrice && (
              <p className="text-sm text-gray-400 line-through">PKR {originalPrice}</p>
            )}
          </div>
          <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
            Rent Now
          </div>
        </div>
      </div>
    </Link>
  );
}
