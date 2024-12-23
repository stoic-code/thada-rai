"use client"
import { FC } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type TFormCancelBtnProps = {
  isSubmitting: boolean;
};

const FormCancelBtn: FC<TFormCancelBtnProps> = ({ isSubmitting }) => {
  if (!isSubmitting) {
    const router = useRouter();
    return (
      <Button
        variant="outline"
        className="border-destructive hover:bg-destructive hover:text-white text-destructive"
        type="button"
        onClick={() => router.back()}
      >
        Cancel
      </Button>
    );
  } else return null;
};

export default FormCancelBtn;
