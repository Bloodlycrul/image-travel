"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { generateFromString } from "generate-avatar";
import Image from "next/image";
import getSession from "../app/utils/getSession";

export default function Home() {
  const session = useSession();
  

  return (
    <>
      <h2>{JSON.stringify(session)}</h2>
      {session && (
        <div>
          <Image
            width={90}
            height={90}
            alt={session?.data?.user?.name || ""}
            src={`data:image/svg+xml;utf8,${generateFromString(
              "example@test.com"
            )}`}
          />
        </div>
      )}
    </>
  );
}
