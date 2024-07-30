"use client";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const [mediaItems, setMediaItems] = useState([]);
  console.log(mediaItems);

  useEffect(() => {
    const getMediaItems = async () => {
      const data = await fetch("/api/media");
      const convertData = await data.json();
      console.log(convertData);
    };

    getMediaItems();
  }, []);

  return (
    <>
      <h2>{JSON.stringify(session)}</h2>
      {session && <div></div>}
    </>
  );
}
