"use client";

import { PickupDropdown } from "../landingpage/pickupdropdown";

interface RentalInfoProps {
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function RentalInfo({
  onStartDateChange,
  onEndDateChange,
}: RentalInfoProps) {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="bg-white rounded-[10px] p-6">
        <h2 className="text-[20px] font-semibold mb-4">Rental Info</h2>
        <div className="grid gap-6">
          <PickupDropdown
            label="Pick-up Date"
            placeholder="Select pick-up date"
            options={["Today", "Tomorrow", "In 2 days"]}
            onChange={(date) => {
              console.log("Selected pick-up date:", date); // Debugging
              onStartDateChange(date); // Directly calling the callback
            }}
          />
          <PickupDropdown
            label="Drop-off Date"
            placeholder="Select drop-off date"
            options={["Tomorrow", "In 2 days", "In 3 days"]}
            onChange={(date) => {
              console.log("Selected drop-off date:", date); // Debugging
              onEndDateChange(date); // Directly calling the callback
            }}
          />
        </div>
      </div>
    </div>
  );
}
