import React from "react";
/**
The position related all code are commented because of safari issue 
Do not use the following styles 

1. Position
2. webkit-transform-style
3. webkit-backface-visibility
4. transition
5. transform 
**/
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleImage, MoreWifeCircle, SpouseCircle } from "../../TreeCommon";
import { dictionary } from "./dictionary";
import { useParams, useSearchParams } from "next/navigation";

const PersonCircle = ({
  person,
  demo,
  reqFunc,
}: {
  person: any;
  reqFunc: (from: string) => Promise<void>;
  demo: boolean;
}) => {
  const params = useSearchParams();
  const { lang } = useParams();
  const type = params.get("type");
  const typeClaim = type === "claimnode";

  const dict = dictionary[lang as keyof typeof dictionary];

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div title={person.name}>
            <CircleImage person={person} />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={lang === "np" ? "text-xl" : ""}>
              {!demo && dict.sure}
            </AlertDialogTitle>
            <AlertDialogDescription className={lang === "np" ? "text-xl" : ""}>
              {!demo
                ? typeClaim
                  ? dict.thisNodewillReplace
                  : dict.thisWillBeSon
                : dict.alreadySentRequest}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {!demo ? dict.cancel : dict.confirm}
            </AlertDialogCancel>
            {!demo && (
              <AlertDialogAction onClick={() => reqFunc(person.id)}>
                {dict.confirm}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const Node = ({
  person,
  reqFunc,
  demo,
}: {
  person: any;
  reqFunc: (from: string) => Promise<void>;
  demo?: boolean;
}) => {
  const isMale = person.gender === "MALE";
  return (
    <div className="flex h-[100px] w-[170px]">
      <PersonCircle demo={demo!} reqFunc={reqFunc} person={person} />
      {person.wives && person.wives.length !== 0 && (
        <SpouseCircle
          isMale={isMale}
          spouse={person.wives ? person.wives[0] : null}
        />
      )}
      {person.wives && person.wives.length > 1 && (
        <MoreWifeCircle moreWife={person.wives.length - 1} />
      )}
      {person.husband && (
        <SpouseCircle isMale={isMale} spouse={person.husband} />
      )}
    </div>
  );
};

export default Node;
