import CardWithImgCircle from "@/components/yogdan/CardWithImgCircle";
import YogdanPopup from "@/components/yogdan/YogdanPopup";
import React from "react";

const YogdanGrid = ({ data }: { data: any }) => {
  return (
    <div className="my-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.map((d: any, idx: number) => (
          <YogdanPopup
            key={idx}
            name={d.name}
            description={d.description}
            image={d.image.secure_url}
            type={d.type}
            birthPlace={d.birthPlace}
            status={d.status}
          >
            <CardWithImgCircle
              image={d.image.secure_url}
              desc={d.description}
              name={d.name}
            />
          </YogdanPopup>
        ))}
    </div>
  );
};

export default YogdanGrid;
