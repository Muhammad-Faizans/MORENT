import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxGroupProps {
  title: string
  items: {
    id: string
    label: string
    count: number
  }[]
}

export function CheckboxGroup({ title, items }: CheckboxGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-[#90A3BF]">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              className="peer h-4 w-4  rounded-sm border-[#C3D4E966] bg-white checked:bg-[#3563E9] focus:ring-[#3563E9] border-2"
              defaultChecked={true}
            />
            <label
              htmlFor={item.id}
              className="flex flex-1 items-center justify-between text-sm font-medium"
            >
              <span>{item.label}</span>
              <span className="text-muted-foreground">({item.count})</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
