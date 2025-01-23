
'use client'
import { Suspense } from 'react'
import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { FilterSidebar } from "@/components/category/sidebar"
import { CarCard } from "@/components/landingpage/car-card"
import { PickupSection } from "@/components/landingpage/pickupsection"
import { Pagination } from "@/components/ui/pagination"
import { Loader } from "@/components/ui/loader"
import { client } from '../../sanity/lib/client'
import { urlForImage } from '../../sanity/lib/image'
import { useState, useEffect } from 'react'

const ITEMS_PER_PAGE = 9

export default function CategoryPage() {
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    fetchCars()
  }, [currentPage, filters])

  const fetchCars = async () => {
    setIsLoading(true)
    try {
      const result = await getCars(filters, currentPage, ITEMS_PER_PAGE)
      setCars(result.cars)
      setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE))
    } catch (error) {
      console.error('Error fetching cars:', error)
    }
    setIsLoading(false)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <PickupSection />
        </div>

        <div className="flex gap-8">
          <FilterSidebar onFilterChange={handleFilterChange} />
          
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">All Cars</h1>
                <span className="text-sm text-muted-foreground">({cars.length} Cars)</span>
              </div>
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <CarCard 
                    key={car._id} 
                    {...car}
                    image={urlForImage(car.image).url()}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

async function getCars(filters = {}, page = 1, itemsPerPage = ITEMS_PER_PAGE) {
  let query = '*[_type == "car"'

  if (filters.priceRange) {
    query += ` && pricePerDay >= ${filters.priceRange[0]} && pricePerDay <= ${filters.priceRange[1]}`
  }

  if (filters.capacity && filters.capacity.length > 0) {
    query += ` && seatingCapacity in [${filters.capacity.map(c => `"${c}"`).join(',')}]`
  }

  if (filters.type && filters.type.length > 0) {
    query += ` && type in [${filters.type.map(t => `"${t}"`).join(',')}]`
  }

  query += ']'

  const totalQuery = `count(${query})`
  const paginatedQuery = `${query} | order(_createdAt desc) [${(page - 1) * itemsPerPage}...${page * itemsPerPage}]`

  const [total, cars] = await Promise.all([
    client.fetch(totalQuery),
    client.fetch(paginatedQuery)
  ])

  return { total, cars }
}

