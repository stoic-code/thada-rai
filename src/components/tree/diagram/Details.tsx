import React from "react";
import { dictionary } from "./dictionary";

const Details = ({ person, lang }: { person: any; lang: any }) => {
  const dict = dictionary[lang as keyof typeof dictionary];
  console.log("my detail: ", person);
  return (
    <ul className="flex flex-col gap-1 text-left">
      <li>
        <span className="font-medium">{dict.fullName} : </span>
        {person.firstName} {person.lastName}
      </li>
      <li>
        <span className="font-medium ">{dict.englishName} : </span>
        <span className="capitalize">{person.englishName}</span>
      </li>

      {person.motherName && (
        <li>
          <span className="font-medium">{dict.mothersName} : </span>
          {person.motherName}
        </li>
      )}

      {!!person.childrenCount && (
        <li>
          <span className="font-medium">{dict.childrenCount} : </span>
          {person.childrenCount}
        </li>
      )}

      {person.maiti && (
        <li>
          <span className="font-medium">{dict.wifeOrigin} : </span>
          {person.maiti}
        </li>
      )}

      {person.birthPlace && (
        <li>
          <span className="font-medium">{dict.birthPlace} : </span>
          {person.birthPlace}
        </li>
      )}
      {person.province && (
        <li>
          <span className="font-medium">{dict.province} : </span>
          {person.province}
        </li>
      )}
      {person.district && (
        <li>
          <span className="font-medium">{dict.district} : </span>
          {person.district}
        </li>
      )}
      {person.profession && (
        <li>
          <span className="font-medium">{dict.profession} : </span>
          {person.profession}
        </li>
      )}
      {person.origin && (
        <li>
          <span className="font-medium">{dict.origin} : </span>
          {person.origin}
        </li>
      )}
      {person.remarks && (
        <li>
          <span className="font-medium">{dict.remarks} : </span>
          {person.remarks}
        </li>
      )}
    </ul>
  );
};

export default Details;
