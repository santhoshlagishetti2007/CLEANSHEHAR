
"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface SteppedProgressProps {
  steps: string[]
  currentStep: number
}

export function SteppedProgress({
  steps,
  currentStep,
}: SteppedProgressProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="relative w-full">
      <Progress value={progress} className="h-2" />
      <div className="mt-2 flex justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={label} className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background font-semibold transition-all",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "",
                  isActive
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
              </div>
              <p
                className={cn(
                  "mt-1.5 text-xs font-medium text-center",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
