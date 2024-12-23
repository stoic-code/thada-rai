import { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import {
  aboutMenu,
  articleMenus,
  banshwaliMenu,
  committeeMenu,
  privateMenu,
  profileMenu,
} from "./menus";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { dictionary } from "@/dictionary";
import { cn } from "@/lib/utils";
import MobileLogout from "./MobileLogout";

type TMobileNavMenu = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  lang: any;
};
type TMobileLink = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  href: string;
  children: React.ReactNode;
};

const MobileLink = ({ state, setState, href, children }: TMobileLink) => {
  return (
    <Link
      onClick={() => {
        setState(!state);
      }}
      href={href}
    >
      {children}
    </Link>
  );
};

// Mobile navigation
export const MobileMenu: React.FC<TMobileNavMenu> = ({
  state,
  setState,
  lang,
}) => {
  const nomenus = ["banshwali", "about", "article"];
  const dict = dictionary[lang as keyof typeof dictionary];
  const privateMenus = privateMenu[lang as keyof typeof privateMenu];
  const articleMenusLang = articleMenus[lang as keyof typeof articleMenus];
  const aboutMenus = aboutMenu[lang as keyof typeof aboutMenu];
  const comitteeMenus = committeeMenu[lang as keyof typeof committeeMenu];
  const banshwaliMenus = banshwaliMenu[lang as keyof typeof banshwaliMenu];
  const profileMenus = profileMenu[lang as keyof typeof profileMenu];
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          className="custom-scrollbar fixed top-16 z-50 h-[100svh] w-screen overflow-y-auto bg-white px-4 pb-5 pt-10 xl:hidden"
        >
          <div
            className={cn(
              "grid h-full grid-cols-2 gap-4 text-[0.8]",
              lang == "np" && "text-base",
            )}
          >
            <ul className="h-full space-y-3">
              {privateMenus.map(
                (item) =>
                  !nomenus.includes(item.to) && (
                    <li key={item.id}>
                      <MobileLink
                        state={state}
                        setState={setState}
                        href={item.to}
                      >
                        {item.title}
                      </MobileLink>
                    </li>
                  ),
              )}

              <hr className="w-[80%]" />
              <li
                className={cn(
                  "text-base font-bold text-muted-foreground",
                  lang == "np" && "text-xl",
                )}
              >
                {dict.aboutUs}
              </li>

              {aboutMenus.map((item) => (
                <li key={item.id}>
                  <MobileLink state={state} setState={setState} href={item.to}>
                    {item.title}
                  </MobileLink>
                </li>
              ))}

              <hr className="w-[80%]" />
              <li
                className={cn(
                  "text-base font-bold text-muted-foreground",
                  lang == "np" && "text-xl",
                )}
              >
                {dict.profile}
              </li>
              {profileMenus.map((item) => (
                <li key={item.id}>
                  <MobileLink state={state} setState={setState} href={item.to}>
                    {item.title}
                  </MobileLink>
                </li>
              ))}
            </ul>
            <ul className="h-full space-y-3">
              <li
                className={cn(
                  "text-base font-bold text-muted-foreground",
                  lang == "np" && "text-xl",
                )}
              >
                {dict.banshawali}
              </li>

              {banshwaliMenus.map((item) => (
                <li key={item.id}>
                  <MobileLink state={state} setState={setState} href={item.to}>
                    {item.title}
                  </MobileLink>
                </li>
              ))}

              <hr className="w-[80%]" />

              <li
                className={cn(
                  "text-base font-bold text-muted-foreground",
                  lang == "np" && "text-xl",
                )}
              >
                {dict.article}
              </li>
              {articleMenusLang.map((item) => (
                <li key={item.id}>
                  <MobileLink state={state} setState={setState} href={item.to}>
                    {item.title}
                  </MobileLink>
                </li>
              ))}

              <hr className="w-[80%]" />

              <li
                className={cn(
                  "text-base font-bold text-muted-foreground",
                  lang == "np" && "text-xl",
                )}
              >
                {dict.comittee}
              </li>
              {comitteeMenus.map((item) => (
                <li key={item.id}>
                  <MobileLink state={state} setState={setState} href={item.to}>
                    {item.title}
                  </MobileLink>
                </li>
              ))}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <li>
                    <button className="text-destructive">LogOut</button>
                  </li>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <MobileLogout />
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
