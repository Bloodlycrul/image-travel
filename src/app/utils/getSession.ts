import { getServerSession } from "next-auth/next";

const getSession = async () => {
  const session = await getServerSession();
  console.log(session);
  return session;
};

export default getSession;
