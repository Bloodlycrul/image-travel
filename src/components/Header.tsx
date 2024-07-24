import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const Header = (props: Props) => {
  const { data: session } = useSession();
  return <div>Header</div>;
};

export default Header;
