import React from "react";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
};

export { LoadingPage };
