// import { Heart } from 'lucide-react';
// import Image from "next/image";
// import Link from "next/link";
// import { FilterIcon } from "./icons";
// import { AuthButton } from "@/components/auth/auth-button";

// export function Navbar() {
//   return (
//     <nav className="border-b bg-white">
//       <div className="container mx-auto px-4 md:px-8">
//         {/* Top Row */}
//         <div className="flex h-[88px] items-center justify-between">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-[#3563E9] text-[28px] md:text-[32px] font-bold leading-[36px]"
//           >
//             MORENT
//           </Link>

//           {/* Desktop Search Bar */}
//           <div className="hidden md:flex relative max-w-[492px] flex-1 mx-8">
//             <input
//               type="search"
//               placeholder="Search something here"
//               className="w-full h-[48px] pl-[48px] pr-[48px] rounded-[70px] border border-[#C3D4E9] text-[#596780] placeholder:text-[#596780] placeholder:opacity-70 focus:outline-none focus:border-[#3563E9]"
//             />
//             <svg
//               className="absolute left-[16px] top-1/2 -translate-y-1/2 h-5 w-5 text-[#596780]"
//               viewBox="0 0 20 20"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
//                 stroke="#596780"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M17.5 17.5L13.875 13.875"
//                 stroke="#596780"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center gap-4 md:gap-8">
//             {/* Hide icons on smaller screens */}
//             <div className="hidden md:flex gap-4">
//               <Heart className="h-6 w-6 text-[#596780] cursor-pointer hover:text-[#3563E9]" />
              
//             </div>
//             <AuthButton />
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         <div className="flex flex-col md:hidden ">
//           <div className="flex items-center gap-2">
//             {/* Search Bar */}
//             <input
//               type="search"
//               placeholder="Search something here"
//               className="flex-1 h-[48px] pl-4 pr-4 mb-4 rounded-[70px] border border-[#C3D4E9] text-[#596780] placeholder:text-[#596780] placeholder:opacity-70 focus:outline-none focus:border-[#3563E9]"
//             />

//             {/* Filter Icon */}
//             <button className="h-[48px] w-[48px] mb-4 flex items-center justify-center rounded-sm bg-[#F5F5F5] border border-[#C3D4E9] hover:bg-[#E4E4E4]">
//               <FilterIcon className="h-5 w-5 text-[#596780]" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FilterIcon } from "./icons"
import { AuthButton } from "@/components/auth/auth-button"
import { SearchResults } from "@/components/landingpage/search-results"
import { useDebounce } from "@/hooks/use-debounce"

type Car = {
  _id: string
  name: string
  image: string
}

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Car[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCars(debouncedSearchTerm)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchTerm])

  const searchCars = async (term: string) => {
    setIsSearching(true)
    try {
      const response = await fetch(`/api/search-cars?term=${encodeURIComponent(term)}`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Error searching cars:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
  }

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Row */}
        <div className="flex h-[88px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-[#3563E9] text-[28px] md:text-[32px] font-bold leading-[36px]">
            MORENT
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex relative max-w-[492px] flex-1 mx-8" ref={searchRef}>
            <input
              type="search"
              placeholder="Search something here"
              className="w-full h-[48px] pl-[48px] pr-[48px] rounded-[70px] border border-[#C3D4E9] text-[#596780] placeholder:text-[#596780] placeholder:opacity-70 focus:outline-none focus:border-[#3563E9]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg
              className="absolute left-[16px] top-1/2 -translate-y-1/2 h-5 w-5 text-[#596780]"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                stroke="#596780"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 17.5L13.875 13.875"
                stroke="#596780"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isSearching && (
              <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#3563E9]"></div>
              </div>
            )}
            {searchResults.length > 0 && <SearchResults results={searchResults} onClose={clearSearch} />}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Hide icons on smaller screens */}
            <div className="hidden md:flex gap-4">
              <Heart className="h-6 w-6 text-[#596780] cursor-pointer hover:text-[#3563E9]" />
            </div>
            <AuthButton />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="flex flex-col md:hidden mb-4">
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="relative flex-1" ref={searchRef}>
              <input
                type="search"
                placeholder="Search something here"
                className="w-full h-[48px] pl-4 pr-4 rounded-[70px] border border-[#C3D4E9] text-[#596780] placeholder:text-[#596780] placeholder:opacity-70 focus:outline-none focus:border-[#3563E9]"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {isSearching && (
                <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#3563E9]"></div>
                </div>
              )}
              {searchResults.length > 0 && <SearchResults results={searchResults} onClose={clearSearch} />}
            </div>

            {/* Filter Icon */}
            <button className="h-[48px] w-[48px] flex items-center justify-center rounded-sm bg-[#F5F5F5] border border-[#C3D4E9] hover:bg-[#E4E4E4]">
              <FilterIcon className="h-5 w-5 text-[#596780]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

