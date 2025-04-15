"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <main>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </main>
  );
}
