import { cn } from "@/lib/utils";
import { getBrowserOrOSDetails } from "@/utils/getOSAndBrowser";
import { pseudoRandomBytes } from "crypto";

export const SpouseCircle = ({
  spouse,
  isMale,
}: {
  spouse: any;
  isMale: boolean;
}) => {
  const isAlive = spouse.status === "ALIVE";
  return (
    <div
      title={`${spouse.firstName} ${spouse.lastName}`}
      style={{
        backgroundColor: "white",
        backgroundImage: `url(${
          spouse.imgurl ? spouse.imgurl : isMale ? "/female.webp" : "/male.webp"
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        // transform: `translateX(${translate}px)`,
        border: `2px solid ${isAlive ? "green" : "gray"}`,
        // zIndex: zIndex,
      }}
    >
      {spouse.status === "DEAD" && (
        <img src="/garland.webp" className="mt-4 w-[40px]" />
      )}
    </div>
  );
};

export const MoreWifeCircle = ({ moreWife }: { moreWife: number }) => {
  return (
    <div className="text-black bg-white mb-3 w-6 h-6 rounded-full text-[10px] font-semibold text-center py-0.5 border-2 border-pink-600">
      +{moreWife}
    </div>
  );
};

export const CircleImage = ({ person }: { person: any }) => {
  const isMale = person.gender === "MALE";
  const isDead = person.status === "DEAD";
  const isMerging = person.mergethis;
  const { browser } = getBrowserOrOSDetails();

  const isUnmarriedMale =
    person?.gender === "MALE" && person?.wives?.length === 0;
  const isUnmarriedFemale = person?.gender === "FEMALE" && !person?.husband;

  const shouldAddMargin =
    (person.wives && person.wives.length > 0) || person.husband;
  return (
    <>
      <div className="">
        {/* except safari generation label */}
        {browser.name !== "Safari" &&
          !isUnmarriedFemale &&
          !isUnmarriedMale && (
            <div className="absolute left-[23%] h-6 w-6 py-0.5 rounded-full border border-black bg-white text-center items-center text-xs font-semibold">
              {person.generation + 1}
            </div>
          )}

        {/* unmarried person generation */}
        {browser.name !== "Safari" && isUnmarriedMale && (
          <div className="absolute h-6 w-6 py-0.5 rounded-full border border-black bg-white text-center items-center text-xs font-semibold">
            {person.generation + 1}
          </div>
        )}

        {/* unmarried daughter generation */}
        {browser.name !== "Safari" && isUnmarriedFemale && (
          <div className="absolute h-6 w-6 py-0.5 rounded-full border border-black bg-white text-center items-center text-xs font-semibold">
            {person.generation + 1}
          </div>
        )}

        <img
          style={{
            border: `2px solid ${
              !isMale && !person.death
                ? "pink"
                : isMale && !isDead
                ? "green"
                : "gray"
            }`,
            borderStyle: person.status === "contact_less" ? "dotted" : "solid",
            borderSpacing: "10px",
            marginLeft: shouldAddMargin ? "" : "25px",
          }}
          className="h-[50px] w-[50px] rounded-full object-cover"
          src={
            person.imgurl
              ? person.imgurl
              : isMale
              ? "/male.webp"
              : "/female.webp"
          }
          alt="person.img"
        />
        {/* safari */}
        {/* {browser.name === "Safari" && (
          <div className="mr-2 mb-4 h-6 w-6 py-0.5 rounded-full border border-black bg-white text-center items-center text-[12px] font-semibold">
            {person.generation + 1}
          </div>
        )} */}
      </div>

      {isDead && (
        <img
          src="/garland.webp"
          className={cn("-mt-7  w-[50px]", !shouldAddMargin && "ml-6")}
        />
      )}
    </>
  );
};
