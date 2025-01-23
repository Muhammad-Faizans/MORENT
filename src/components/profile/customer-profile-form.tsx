'use client'

import { useState } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/../hooks/use-toast"

type CustomerData = {
  _id: string
  name: string
  email: string
  image: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: string
  createdAt: string
  bookings: Array<{
    _id: string
    startDate: string
    endDate: string
    car: {
      name: string
      image: string
    }
  }>
}

export function CustomerProfileForm({ initialData }: { initialData: CustomerData }) {
  const [formData, setFormData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
      router.refresh()
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={formData.image || "/placeholder.svg"}
              alt={formData.name || "Customer"}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={formData.email || ''} onChange={handleChange} disabled />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={formData.address || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth || ''} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          {formData.bookings && formData.bookings.length > 0 ? (
            <ul className="space-y-4">
              {formData.bookings.map((booking) => (
                <li key={booking._id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <Image
                    src={booking.car.image || "/placeholder.svg"}
                    alt={booking.car.name || "Car"}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <div>
                    <p className="font-semibold">{booking.car.name || "N/A"}</p>
                    <p className="text-sm text-gray-500">
                      {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "N/A"} - 
                      {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </CardContent>
      </Card>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  )
}

