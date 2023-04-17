import { UserSchema } from "@/graphql/schemas/user";
import { useMutation } from "@apollo/client";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

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
  if (session) {
    if (session.user.username) {
      return <></>;
    }
  }
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState("");
  const [createUsername, { loading }] = useMutation<
    CreateUserName,
    CreateUserNameProps
  >(UserSchema.Mutations.createUsername);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const createUser = async () => {
    if (username.length < 3) return;
    setError("");
    try {
      const { data } = await createUsername({
        variables: { username: username },
      });

      if (data?.createUsername.error) {
        setError(
          data?.createUsername.error ||
            "There was an error but couldn't displayed."
        );
        throw new Error(`Error! ${data?.createUsername.error}`);
      }

      reloadSession();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`flex h-screen`}>
      <div className="m-auto w-96 rounded-xl bg-[#202C33] tracking-wide text-white">
        {session ? (
          <div className="flex flex-col space-y-5 p-10">
            <ul className="list-disc space-y-2">
              <li>
                <p>Username length can't be more then 10</p>
              </li>
              <li
                className={`${
                  username.length < 3 && "text-[red]"
                } transition-colors duration-500`}>
                <p>Username length must be 3 minimum</p>
              </li>
              <li>
                <p>Only letters and numbers</p>
              </li>
            </ul>
            <div className="flex items-center rounded-md bg-[#2A3942] px-1 py-2">
              <input
                type="text"
                required
                value={username}
                maxLength={10}
                placeholder="Enter a username"
                onChange={(e) => {
                  const result = e.target.value.replace(/[^a-zA-Z1-9]/gi, "");
                  setUsername(result);
                }}
                className="w-full bg-inherit p-1 outline-none"
              />
              <p
                className={`text-gray-400 opacity-50 ${
                  username.length > 7 && "!text-[red] !opacity-100"
                }`}>
                {10 - username.length}
              </p>
            </div>
            <button
              onClick={() => createUser()}
              disabled={loading}
              className={`rounded-xl bg-[#111B21] p-2 transition-opacity duration-200 hover:opacity-50 ${
                loading && "opacity-50"
              }`}>
              Create Username
            </button>
            {error && (
              <p className="text-center text-[red]">{error} please try other</p>
            )}
          </div>
        ) : (
          <div className="space-y-10 p-10">
            <h1 className="text-3xl">Welcome to message-app</h1>
            <h4 className="text-center">Please login to continue</h4>
            <button
              className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-[#111B21] py-2 text-xl transition-opacity duration-200 hover:opacity-75"
              onClick={() => signIn("google")}>
              <FaGoogle className="h-5 w-5" />
              <p className="">Sign In With Google</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
