'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export function FilterSidebar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [capacity, setCapacity] = useState<string[]>([])
  const [type, setType] = useState<string[]>([])

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleCapacityChange = (value: string) => {
    setCapacity((prev) => 
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const handleTypeChange = (value: string) => {
    setType((prev) => 
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const handleApplyFilters = () => {
    onFilterChange({ priceRange, capacity, type })
  }

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Capacity</h3>
        {['2', '4', '6', '8+'].map((item) => (
          <div key={item} className="flex items-center mb-2">
            <Checkbox
              id={`capacity-${item}`}
              checked={capacity.includes(item)}
              onCheckedChange={() => handleCapacityChange(item)}
            />
            <label htmlFor={`capacity-${item}`} className="ml-2">{item} Person</label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Car Type</h3>
        {['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback'].map((item) => (
          <div key={item} className="flex items-center mb-2">
            <Checkbox
              id={`type-${item}`}
              checked={type.includes(item)}
              onCheckedChange={() => handleTypeChange(item)}
            />
            <label htmlFor={`type-${item}`} className="ml-2">{item}</label>
          </div>
        ))}
      </div>

      <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
    </div>
  )
}
