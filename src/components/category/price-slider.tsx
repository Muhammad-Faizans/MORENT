import * as React from "react"
import { Slider } from "@/components/ui/slider"

export function PriceSlider() {
  const [value, setValue] = React.useState([0, 100])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Max. $100.00</span>
      </div>
      <Slider
        defaultValue={value}
        max={100}
        step={1}
        className="w-full bg-blue-500"
        onValueChange={setValue}
      />
    </div>
  )
}
