"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error("Error caught by Next.js error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          {error?.message || "An unexpected error occurred"}
        </p>
        <div className="space-y-4">
          <Button onClick={reset} className="w-full">
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full"
          >
            Go to Homepage
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 p-4 bg-gray-100 rounded text-left overflow-auto text-sm">
            {error.stack}
          </pre>
        )}
      </div>
    </div>
  );
}
