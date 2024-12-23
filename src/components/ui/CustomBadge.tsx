import { cn } from "@/lib/utils";
import { CircleDot } from "lucide-react";
import React from "react";

export const CustomBadge = ({
  className,
  children,
  color,
}: {
  className?: string;
  children: React.ReactNode;
  color: string;
}) => {
  return (
    <div
      className={cn(
        `bg-${color}-100 text-${color}-500 flex w-fit items-center gap-2 rounded-full px-3 py-1`,
        className,
      )}
    >
      <CircleDot className={`text-${color}-400`} size={16} />
      {children}
    </div>
  );
};
