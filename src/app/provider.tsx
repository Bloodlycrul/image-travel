"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
};

export default Provider;
