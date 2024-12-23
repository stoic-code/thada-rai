"use client";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackBtn = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={cn("text-blue-600 flex gap-2 items-center", className)}
    >
      <MoveLeft /> Back
    </button>
  );
};

export default BackBtn;
