"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    console.error("Auth error:", error);
  }, [error]);

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>An error occurred during authentication: {error}</p>
    </div>
  );
}
