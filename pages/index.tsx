import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {
  const { data: session } = useSession();
console.log(session);

  return (
    <main>
      <Login />
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session,
    },
  };
}
