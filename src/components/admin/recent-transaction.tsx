import Image from "next/image"

interface Transaction {
  id: string
  carName: string
  carType: string
  carImage: string
  date: string
  price: number
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="bg-white rounded-[10px] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[18px] md:text-[20px] font-bold">Recent Transaction</h2>
        <button className="text-[#3563E9] text-[12px] md:text-[14px] font-semibold">View All</button>
      </div>

      <div className="space-y-3 md:space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex gap-4 items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <Image
                src={transaction.carImage}
                alt={transaction.carName}
                width={80}
                height={34}
                className="rounded-[8px]"
              />
              <div>
                <h3 className="font-bold text-[14px] md:text-[16px]">{transaction.carName}</h3>
                <p className="text-[#90A3BF] text-[12px] md:text-[14px]">{transaction.carType}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[14px] md:text-[16px]">${transaction.price.toFixed(2)}</p>
              <p className="text-[#90A3BF] text-[12px] md:text-[14px]">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

