interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
    title: string
    description: string
  }
  
  export function StepIndicator({ currentStep, totalSteps, title, description }: StepIndicatorProps) {
    return (
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[20px] font-semibold text-[#1A202C] mb-1">{title}</h2>
          <p className="text-[14px] text-[#90A3BF]">{description}</p>
        </div>
        <span className="text-[14px] text-[#90A3BF]">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    )
  }
  
  