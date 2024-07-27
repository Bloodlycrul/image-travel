"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <p>Dashboard</p>
      {session.data?.user.name}
    </>
  );
};

export default Dashboard;
