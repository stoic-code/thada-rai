import { Loader2 } from "lucide-react";

const PageLoadingUI = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="text-muted-foreground animate-spin" />
    </div>
  );
};

export default PageLoadingUI;
