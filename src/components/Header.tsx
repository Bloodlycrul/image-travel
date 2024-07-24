"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
type Props = {};

const Header = (props: Props) => {
  const session = useSession();

  return (
    <div className="flex justify-around">
      <div>Hello I am woking</div>

      {session.status === "unauthenticated" ? (
        <button
          className="bg-white text-black px-10 py-2 rounded-lg"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      ) : (
        <button
          className="bg-white text-black px-10 py-2 rounded-lg"
          onClick={() => signOut()}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
