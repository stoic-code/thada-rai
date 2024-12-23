import React from "react";

const SlideIndicator = () => {
  return (
    <div className="h-16 md:h-24 flex gap-2 items-center justify-center">
      <span className="h-2 w-2 bg-primary rounded-full"></span>
      <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
      <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
      <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
    </div>
  );
};

export default SlideIndicator;
