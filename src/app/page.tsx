"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <>
      <Header />
      <h2>{JSON.stringify(session)}he</h2>
    </>
  );
}
