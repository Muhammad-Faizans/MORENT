"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface RentNowButtonProps {
  carId: string
  isAuthenticated: boolean
}

export function RentNowButton({ carId, isAuthenticated }: RentNowButtonProps) {
  const router = useRouter()

  const handleRentNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a car.",
        variant: "destructive",
      })
      router.push(`/auth/signin?callbackUrl=/cars/${carId}`)
    } else {
      router.push(`/payment/${carId}`)
    }
  }

  return (
    <Button
      className="bg-[#3563E9] hover:bg-[#2748BA] h-10 md:h-14 px-4 md:px-8 text-sm md:text-base"
      onClick={handleRentNow}
    >
      Rent Now
    </Button>
  )
}

