"use client";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { set } = Cookies;
  const router = useRouter();
  const { lang } = useParams();

  return (
    <button
      className={cn("uppercase outline-none", className)}
      onClick={() => {
        console.log("hello");
        set("lang", lang === "np" ? "en" : "np");
        router.refresh();
      }}
    >
      {lang == "en" ? (
        <span className="flex gap-1">
          NP
          <img width={20} src="/icons/nepali-flag.svg" alt="Nepali Flag Ico" />
        </span>
      ) : (
        <span className="flex gap-1">
          EN
          <img width={20} src="/icons/uk-flag.svg" alt="Nepali Flag Ico" />
        </span>
      )}
    </button>
  );
};

export default LanguageSwitcher;
