'use client';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import Link from "next/link";
import { CarCard } from "./car-card";
import { Loader } from "@/components/ui/loader";
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Car {
  _id: string;
  image: any;
  name: string;
  type: string;
  fuelCapacity: number;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  // Add other properties of the car object here
}

export function PopularCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch popular cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await client.fetch('*[_type == "car" && "popular" in tags]');
        setCars(result);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        setIsLoading(false);
      }
    };
    
    fetchCars();
  }, []);
  
  function useEffect(arg0: () => void, arg1: never[]) {
    // throw new Error('Function not implemented.');
  }
  const scrollByPercentage = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.clientWidth * 0.8; // Scroll by 80% of the container width
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollWidth : -scrollWidth,
        behavior: 'smooth',
      });
      // Update active index
      const newIndex =
        direction === 'right'
          ? Math.min(activeIndex + 1, cars.length - 1)
          : Math.max(activeIndex - 1, 0);
      setActiveIndex(newIndex);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="mb-8 mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[32px] font-semibold">Popular Cars</h2>
        <Link 
          href="/category" 
          className="text-[#3563E9] text-[14px] font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full z-10 hidden lg:block"
          onClick={() => scrollByPercentage('left')}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full z-10 hidden lg:block"
          onClick={() => scrollByPercentage('right')}
        >
          <ChevronRight size={20} />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto lg:overflow-hidden scrollbar-hidden"
        >
          {cars.map((car, index) => (
            <div
              key={car._id}
              className={`min-w-[300px] sm:min-w-[250px] flex-shrink-0 transition-transform duration-300 ${
                index === activeIndex ? 'scale-105 shadow-lg' : ''
              }`}
            >
              <CarCard 
                {...car}
                image={urlForImage(car.image).url()}
                name={car.name}
                type={car.type}
                fuelCapacity={car.fuelCapacity.toString()}
                transmission={car.transmission}
                seatingCapacity={car.seatingCapacity.toString()}
                pricePerDay={car.pricePerDay}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

