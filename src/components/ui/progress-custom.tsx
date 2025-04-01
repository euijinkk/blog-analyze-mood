
import React from "react";
import { Progress as ProgressPrimitive } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function CustomProgress({ value, className, indicatorClassName }: CustomProgressProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <ProgressPrimitive value={value} className={className} />
      <div 
        className={cn("absolute top-0 left-0 h-full rounded-full", indicatorClassName)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
