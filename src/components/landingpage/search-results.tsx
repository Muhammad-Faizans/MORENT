"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

type Car = {
  _id: string
  name: string
  image: string
}

type SearchResultsProps = {
  results: Car[]
  onClose: () => void
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
  const router = useRouter()

  const handleCarClick = (carId: string) => {
    router.push(`/cars/${carId}`)
    onClose()
  }

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-4 mt-2 z-50">
        <p className="text-gray-500">No cars found</p>
      </div>
    )
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-2 z-50 max-h-96 overflow-y-auto">
      {results.map((car) => (
        <button
          key={car._id}
          onClick={() => handleCarClick(car._id)}
          className="flex items-center w-full p-4 hover:bg-gray-100 transition-colors duration-200 text-left"
        >
          <Image
            src={car.image || "/placeholder.svg"}
            alt={car.name}
            width={50}
            height={50}
            className="rounded-md mr-4"
          />
          <span className="text-gray-800">{car.name}</span>
        </button>
      ))}
    </div>
  )
}

