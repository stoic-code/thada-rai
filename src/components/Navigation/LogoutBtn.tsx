"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type TMobileNavMenu = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

const LogoutBtn: React.FC<TMobileNavMenu> = ({ state, setState }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        setState(!state);
        router.push("/");
        sessionStorage.clear();
      }}
      className="flex gap-2 text-destructive"
    >
      <LogOut size={20} />
      Logout
    </button>
  );
};

export default LogoutBtn;
