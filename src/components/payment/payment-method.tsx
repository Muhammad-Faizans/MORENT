import Image from "next/image"
import CashIcon from "../../assets/cash.png"

export function PaymentMethod() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-[#F6F7F9] rounded-[10px] border-2 border-[#3563E9]">
        <input
          type="radio"
          name="payment"
          value="credit-card"
          checked
          className="w-4 h-4 text-[#3563E9]"
        />
        <span className="flex-1 font-semibold">Cash on Car Pickup</span>
        <div className="flex">
          <Image src={CashIcon} alt="Cash Icon" width={77} height={20}  />
        </div>
      </div>
    </div>
  )
}

