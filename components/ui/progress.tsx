"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-3 w-full overflow-hidden rounded-full bg-white/20 backdrop-blur-sm", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out shadow-lg"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 blur-sm opacity-50"></div>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
