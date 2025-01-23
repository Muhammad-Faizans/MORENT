'use client'

import Image, { StaticImageData } from "next/image"
import { useState } from "react"

interface ImageGalleryProps {
  images: {
    id: number
    src: string | StaticImageData
    alt: string
  }[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="relative h-[240px] md:h-[360px] rounded-none md:rounded-[10px] overflow-hidden bg-[#54A6FF]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#54A6FF] to-[#3563E9]" />
        <div className="relative z-10 p-4 md:p-8">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-white mb-2 md:mb-4">
            Sports car with the best<br />design and acceleration
          </h2>
          <p className="text-[14px] md:text-[16px] text-white/70">
            Safety and comfort while driving a<br />futuristic and elegant sports car
          </p>
        </div>
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={400}
          height={300}
          className="absolute bottom-0 right-0"
        />
      </div>
      <div className="flex gap-3 md:gap-4 px-4 md:px-0">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`relative h-[64px] md:h-[96px] w-[96px] md:w-[144px] rounded-[8px] overflow-hidden ${
              selectedImage.id === image.id ? "ring-2 ring-[#3563E9]" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

