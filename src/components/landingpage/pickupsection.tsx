import { SwitchIcon } from "./icons";
import { PickupDropdown } from "./pickupdropdown";

export function PickupSection() {
  return (
    <div className="container mx-auto px-4 md:px-0">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[1fr,auto,1fr] gap-4 items-start mb-8">
        <div className="bg-white rounded-[10px] p-6">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="radio"
              name='pickdrop'
              className="w-4 h-4 text-[#3563E9]"
            />
            <span className="text-[16px] font-semibold">Pick - Up</span>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-6">
            <PickupDropdown
              label="Locations"
              placeholder="Select your city"
              options={["New York", "Los Angeles", "Chicago"]}
            />
            <div className="grid grid-cols-2 gap-6">
              <PickupDropdown
                label="Date"
                placeholder="Select your date"
                options={["Today", "Tomorrow", "In 2 days"]}
              />
              <PickupDropdown
                label="Time"
                placeholder="Select your time"
                options={["10:00 AM", "11:00 AM", "12:00 PM"]}
              />
            </div>
          </div>
        </div>

        <button className="bg-[#3563E9] w-[50px] h-[50px] rounded-[10px] flex items-center justify-center mt-[60px]">
          <SwitchIcon />
        </button>

        <div className="bg-white rounded-[10px] p-6">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="radio"
              name='pickdrop'
              className="w-4 h-4 text-[#3563E9]"
            />
            <span className="text-[16px] font-semibold">Drop - Off</span>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-6">
            <PickupDropdown
              label="Locations"
              placeholder="Select your city"
              options={["New York", "Los Angeles", "Chicago"]}
            />
            <div className="grid grid-cols-2 gap-6">
              <PickupDropdown
                label="Date"
                placeholder="Select your date"
                options={["Today", "Tomorrow", "In 2 days"]}
              />
              <PickupDropdown
                label="Time"
                placeholder="Select your time"
                options={["10:00 AM", "11:00 AM", "12:00 PM"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        <div className="bg-white rounded-[12px] p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="radio"
              name='pickdrop'
              className="w-4 h-4 accent-[#3563E9]"
            />
            <span className="text-[16px] font-medium">Pick - Up</span>
          </div>
          <div className="space-y-4">
            
              <PickupDropdown
                label="Locations"
                placeholder="Semarang"
                options={["New York", "Los Angeles", "Chicago"]}
              />
              <div className="flex gap-2">
              <PickupDropdown
                label="Date"
                placeholder="20 July 2022"
                options={["Today", "Tomorrow", "In 2 days"]}
              />
              <PickupDropdown
                label="Time"
                placeholder="07.00"
                options={["10:00 AM", "11:00 AM", "12:00 PM"]}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-[#3563E9] w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md hover:bg-[#2a50c9] transition">
            <SwitchIcon />
          </button>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <input type="radio" className="w-4 h-4 accent-[#3563E9]" />
            <span className="text-[16px] font-medium">Drop - Off</span>
          </div>
          <div className="space-y-4">

              <PickupDropdown
                label="Locations"
                placeholder="Semarang"
                options={["New York", "Los Angeles", "Chicago"]}
              />
              <div className="flex gap-2">
              <PickupDropdown
                label="Date"
                placeholder="21 July 2022"
                options={["Today", "Tomorrow", "In 2 days"]}
              />
              <PickupDropdown
                label="Time"
                placeholder="01.00"
                options={["10:00 AM", "11:00 AM", "12:00 PM"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
