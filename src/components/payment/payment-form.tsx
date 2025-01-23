"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/payment/form-input"
import { RentalInfo } from "@/components/payment/rental-info"
import { PaymentMethod } from "@/components/payment/payment-method"
import { RentalSummary } from "@/components/payment/rental-summary"
import { toast } from "@/hooks/use-toast"
import { urlForImage } from "@/sanity/lib/image"

interface PaymentFormProps {
  car: any
  userId: string
}

export function PaymentForm({ car, userId }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    startDate: "",
    endDate: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (!formData.startDate || !formData.endDate) {
        throw new Error("Please select start and end dates");
      }
  
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car._id,
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalAmount: car.pricePerDay * calculateDays(formData.startDate, formData.endDate),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }
  
      const result = await response.json();
  
      toast({
        title: "Booking Successful",
        description: "Your car has been booked successfully!",
      });
      router.push("/profile");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Failed",
        description:
          error instanceof Error ? error.message : "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1 // Ensure at least 1 day is returned
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-[10px] p-6">
        <h2 className="text-[20px] font-semibold mb-4">Billing Info</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput label="Name" placeholder="Your name" name="name" value={formData.name} onChange={handleChange} />
          <FormInput
            label="Phone Number"
            placeholder="Phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormInput
            label="Address"
            placeholder="Address"
            name="address"
            className="md:col-span-2"
            value={formData.address}
            onChange={handleChange}
          />
          <FormInput
            label="Town/City"
            placeholder="Town or city"
            name="city"
            className="md:col-span-2"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
      </div>

      <RentalInfo
        onStartDateChange={(date) => setFormData({ ...formData, startDate: date })}
        onEndDateChange={(date) => setFormData({ ...formData, endDate: date })}
      />

      <PaymentMethod />

      <RentalSummary
        carName={car.name}
        carImage={urlForImage(car.image).url()}
        rating={4}
        reviewCount={440}
        subtotal={car.pricePerDay * calculateDays(formData.startDate, formData.endDate)}
        tax={0}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Confirm Booking"}
      </Button>
    </form>
  )
}

