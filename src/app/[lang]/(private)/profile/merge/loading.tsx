import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-2 mt-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton key={idx} className="w-full h-10" />
      ))}
    </div>
  );
};

export default Loading;
