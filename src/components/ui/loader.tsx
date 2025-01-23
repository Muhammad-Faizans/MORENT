import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-[#3563E9]" />
    </div>
  )
}

