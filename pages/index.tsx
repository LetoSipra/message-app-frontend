import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const { data: session } = useSession();
  if (!session || !session.user.username) return <Login />;

  return (
    <>
      <main className="flex h-screen">
        <section className="flex-[0.3]">
          <Sidebar />
        </section>
        <section className="flex-[0.7]">
          <Chat />
        </section>
      </main>
    </>
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
