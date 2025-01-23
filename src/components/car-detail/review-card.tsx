import Image, { StaticImageData } from "next/image"
import { StarRating } from "./star-rating"

interface ReviewCardProps {
  name: string
  title: string
  date: string
  rating: number
  comment: string
  avatar: string | StaticImageData
}

export function ReviewCard({
  name,
  title,
  date,
  rating,
  comment,
  avatar
}: ReviewCardProps) {
  return (
    <div className="border-b border-[#C3D4E966] py-4 md:py-6 last:border-none">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex gap-3 md:gap-4">
          <Image
            src={avatar}
            alt={name}
            width={44}
            height={44}
            className="rounded-full w-10 h-10 md:w-11 md:h-11"
          />
          <div>
            <h3 className="font-semibold text-[14px] md:text-[16px]">{name}</h3>
            <p className="text-[#90A3BF] text-[12px] md:text-[14px]">{title}</p>
          </div>
        </div>
        <span className="text-[#90A3BF] text-[12px] md:text-[14px]">{date}</span>
      </div>
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <StarRating rating={rating} />
      </div>
      <p className="text-[#596780] text-[12px] md:text-[14px] leading-[180%] md:leading-[200%]">{comment}</p>
    </div>
  )
}

