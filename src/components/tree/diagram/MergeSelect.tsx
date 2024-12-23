import React from "react";
import Link from "next/link";
import { dictionary } from "./dictionary";
import { Button } from "@/components/ui/button";

const MergeSelect = ({
  person,
  lang,
  type,
  setType,
  mother,
  setMother,
}: {
  person: any;
  lang: any;
  type: string;
  setType: (type: string) => void;
  mother: string;
  setMother: (type: string) => void;
}) => {
  const dict = dictionary[lang as keyof typeof dictionary];

  return (
    <>
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setMother("");
        }}
        className="h-10 rounded-md outline-none"
      >
        <option value="" disabled>
          {dict.requestType}
        </option>
        <option value="claimnode">{dict.asSelf}</option>
        <option value="mergeasson">{dict.asSon}</option>
      </select>

      {type === "claimnode" && (
        <Button asChild>
          <Link href={`/family/merge/self?here=${person.id}&type=${type}`}>
            {dict.claimNode}
          </Link>
        </Button>
      )}

      {type === "mergeasson" && (
        <select
          value={mother}
          onChange={(e) => setMother(e.target.value)}
          className="h-10 rounded-md outline-none"
          name=""
          id=""
        >
          <option value="" disabled>
            {dict.selectMother}
          </option>
          {person.wives &&
            person.wives.map((w: any, idx: number) => (
              <option key={idx} value={w.id}>
                {`${w.firstName} ${w.lastName}`}
              </option>
            ))}
          <option value="new">{dict.noneOfAbove}</option>
        </select>
      )}
      {mother.length >= 1 && (
        <Button asChild>
          {mother === "new" ? (
            <Link href={`/family/merge?here=${person.id}&type=${type}`}>
              {dict.mergeAndAddMotherLater}
            </Link>
          ) : (
            <Link
              href={`/family/merge?here=${person.id}&motherId=${mother}&type=${type}`}
            >
              {dict.mergeHere}
            </Link>
          )}
        </Button>
      )}
    </>
  );
};

export default MergeSelect;
