"use client";

import { LoadingPage } from "@/components/ui/loading-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </QueryClientProvider>
  );
}
