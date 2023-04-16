import { UserSchema } from "@/graphql/schemas/user";
import { useMutation } from "@apollo/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

interface CreateUserName {
  createUsername: {
    success: boolean;
    error: string;
  };
}

interface CreateUserNameProps {
  username: string;
}

function Login() {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string>("");
  const [createUsername, { data, loading, error }] = useMutation<
    CreateUserName,
    CreateUserNameProps
  >(UserSchema.Mutations.createUsername);

  console.log("SUP MAN",data, loading, error);

  const createUser = async () => {
    if (username.length < 3) return;
    try {
      await createUsername({ variables: { username: username } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {session ? (
          <button onClick={() => signOut()}>signOut</button>
        ) : (
          <button onClick={() => signIn("google")}>signIn</button>
        )}
      </div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-black"
      />
      <button onClick={() => createUser()} className="bg-black/25">
        Create User
      </button>
    </>
  );
}

export default Login;
