import { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
type TMobileNavMenu = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  lang: string;
};
import { publicMenu } from "./menus";
import { X } from "lucide-react";
import { Button } from "../ui/button";

// Mobile navigation
export const MobileMenu: React.FC<TMobileNavMenu> = ({
  state,
  setState,
  lang,
}) => {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          transition={{ duration: 0.3 }}
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -500, opacity: 0 }}
          className="fixed z-[10000] h-screen w-screen bg-white pt-52 xl:hidden"
        >
          <button
            className="absolute right-5 top-5"
            onClick={() => {
              setState(!state);
            }}
          >
            <X />
          </button>
          <ul className="text-md flex flex-col justify-center gap-8 text-center font-semibold">
            {publicMenu[lang as keyof typeof publicMenu].map(
              (menu: any, idx: number) => (
                <li key={idx}>
                  <Link
                    onClick={() => {
                      setState(!state);
                    }}
                    href={menu.to}
                    className={`link cursor-pointer`}
                  >
                    {menu.title}
                  </Link>
                </li>
              ),
            )}
            <div>
              <Button className="px-8" asChild>
                <Link onClick={() => setState(!state)} href="/signin">
                  Login
                </Link>
              </Button>
            </div>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
