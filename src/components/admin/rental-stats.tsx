import Image from "next/image"
import Chartimg from "../../assets/Chart.png"

interface RentalStatsProps {
  data: {
    label: string
    value: number
    color: string
  }[]
  total: number
}

export function RentalStats({ data, total }: RentalStatsProps) {
  return (
    <div className="bg-white rounded-[10px] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[18px] md:text-[20px] font-bold">Top 5 Car Rental</h2>
        <button className="text-[#90A3BF]">•••</button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] mb-4 md:mb-0">
          <Image src={Chartimg} alt="Chart Image" layout="fill" objectFit="contain" />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-[20px] md:text-[24px] font-bold">{total.toLocaleString()}</span>
            <span className="text-[12px] md:text-[14px] text-[#90A3BF]">Rental Car</span>
          </div>
        </div>

        <div className="flex-1 md:ml-8 w-full">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap02 justify-between mb-3 md:mb-4 last:mb-0">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
                <span className="text-[12px] md:text-[14px]">{item.label}</span>
              </div>
              <span className="font-semibold text-[12px] md:text-[14px]">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

