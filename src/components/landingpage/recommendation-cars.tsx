'use client'
import { useState, useEffect } from 'react'
import { CarCard } from "./car-card"
import { Loader } from "@/components/ui/loader"
import { client } from '../../sanity/lib/client'
import { urlForImage } from '../../sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export function RecommendationCars() {
  interface Car {
    _id: string;
    image: SanityImageSource;
    name: string;
    type: string;
    fuelCapacity: string;
    transmission: string;
    seatingCapacity: string;
    pricePerDay: number;
    tags?: string[];
  }

  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await client.fetch<Car[]>('*[_type == "car" && "recommended" in tags]')
        setCars(result)
        setIsLoading(false)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(String(err))
        }
        setIsLoading(false)
      }
    }
    fetchCars()
  }, [])

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[32px] font-semibold">Recommendation Car</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars.map((car) => (
          <CarCard 
            key={car._id} 
            id={car._id}
            image={urlForImage(car.image).url()}
            name={car.name}
            type={car.type}
            fuelCapacity={car.fuelCapacity}
            transmission={car.transmission}
            seatingCapacity={car.seatingCapacity}
            pricePerDay={car.pricePerDay}
          />
        ))}
      </div>
    </section>
  )
}
