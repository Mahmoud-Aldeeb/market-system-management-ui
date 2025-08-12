"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserDataContext from "../context/userdata";
import { ToastContainer } from "react-toastify";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [userData, setUserData] = React.useState({});

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <ToastContainer />
          {children}
        </UserDataContext.Provider>
      </QueryClientProvider>
    </main>
  );
}
