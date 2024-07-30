"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Dashboard = () => {
  const [url, setUrl] = useState<string | null>();
  const session = useSession();
  async function handleGoogleClick() {
    try {
      const response = await fetch("http://localhost:3000/api/googlephotos");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Assuming response is JSON
      console.log(data);
      setUrl(data.url); // Assuming the response contains a property called 'url'
      console.log(data.url);
    } catch (error) {
      console.error("Error fetching the URL:", error);
    }
  }

  return (
    <>
      <p>Dashboard</p>
      {session.data?.user.name}
      <Button onClick={handleGoogleClick}> Access the Google Photos</Button>
      {url && <a href={url}>Click Here</a>}
    </>
  );
};

export default Dashboard;
