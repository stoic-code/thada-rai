"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: 1,
    title: "Your Information",
  },
  {
    step: 2,
    title: "Parents Details",
  },
  {
    step: 3,
    title: "Children's Detail",
  },
  {
    step: 4,
    title: "Review & Submit",
  },
];

const TopBar = () => {
  const params = useSearchParams();
  const urlStep = params.get("step");

  return (
    <div className="flex mt-10 mb-6 items-center gap-4 bg-white py-6 px-4 flex-wrap">
      {steps.map((step, idx) => (
        <div className="flex items-center" key={idx}>
          <div className="flex gap-2 items-center">
            <div
              className={cn(
                "h-4 p-3 w-4 bg-gray-500 flex items-center justify-center rounded-full text-white font-semibold",
                Number(urlStep) >= step.step || step.step === 1
                  ? "bg-primary"
                  : null,
              )}
            >
              {step.step}
            </div>
            <span className="text-black">{step.title}</span>
          </div>
          {step.step < 4 ? <ChevronRight /> : null}
        </div>
      ))}
    </div>
  );
};

export default TopBar;
