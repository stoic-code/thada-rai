import React from "react";

const NofullTree = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <img src="/404.svg" width={200} height={200} alt="" />
      <h1 className="text-3xl font-semibold">
        Looks like you haven't merged with anyone
      </h1>
      <p className="text-muted-foreground">
        You will be able to view full tree once you have merged with someone
        else.
      </p>
      <div className="space-y-1 text-center">
        <p className="font-semibold">Try Searching Other families</p>
        <p>or</p>
        <a href="/dashboard" className="text-blue-500 hover:underline">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NofullTree;
