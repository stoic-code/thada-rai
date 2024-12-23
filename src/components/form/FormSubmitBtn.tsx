"use client";
import React, { FC, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type TFormSubmitBtnProps = {
  isSubmitting: boolean;
  children: ReactNode;
  className?: string;
};
const FormSubmitBtn: FC<TFormSubmitBtnProps> = ({
  children,
  isSubmitting,
  className,
}) => {
  return (
    <Button disabled={isSubmitting} className={cn("flex gap-2", className)}>
      {isSubmitting && <Loader2 size={20} className="animate-spin" />}
      {children}
    </Button>
  );
};

export default FormSubmitBtn;
