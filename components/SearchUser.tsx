import React, { Dispatch, SetStateAction, useState } from "react";
import { HiArrowLeft, HiCheck } from "react-icons/hi2";
import { HiSearch } from "react-icons/hi";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UserSchema } from "@/graphql/Operations/user";
import SearchedUsers from "./SearchedUsers";
import Image from "next/image";
import chats from "@/graphql/Operations/chats";
import { useSession } from "next-auth/react";

interface Props {
  slideBarOpen: boolean;
  setSlideBarOpen: Dispatch<SetStateAction<boolean>>;
}

interface SearchedUsers {
  id: string;
  username: string;
}

interface SearchUserData {
  searchUsers: SearchedUsers[];
}

interface SearchUserInput {
  username: string;
}

interface CreateInput {
  getIDs: string[];
}

function SearchUser({ slideBarOpen, setSlideBarOpen }: Props) {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<{ id: string }[]>([]);
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUserData,
    SearchUserInput
  >(UserSchema.Queries.searchUsers);
  const [create, { loading: createLoading }] = useMutation<
    string[],
    { IDs: string[] }
  >(chats.Mutations.create);

  const searchUsersFC = () => {
    searchUsers({ variables: { username } });
  };

  const addSelectedUsers = (userID: string) => {
    setSelectedUsers((prev) => [...prev, { id: userID }]);
  };

  const deleteSelectedUsers = (userID: string) => {
    const filterUsers = selectedUsers.filter((user) => user.id !== userID);
    setSelectedUsers(filterUsers);
  };

  const createFC = async () => {
    if (!session) return;
    const IDs = [session.user.id, ...selectedUsers.map((user) => user.id)];

    try {
      const { data } = await create({
        variables: {
          IDs,
        },
      });

      if (!data) {
        throw new Error("Failed to create new chat");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div
        className={`absolute left-0 top-0
    z-50 h-full transform bg-[#111B21] shadow-xl transition-all duration-200  ease-out 
    ${slideBarOpen ? "w-full" : " w-0"} `}>
        {slideBarOpen && (
          <div className="flex h-full flex-col justify-between">
            <div className="mx-5 my-5 space-y-5">
              <div className="flex items-center space-x-5">
                <HiArrowLeft
                  className="h-10 w-10 p-1 "
                  onClick={() => setSlideBarOpen(false)}
                />
                <p>Add User</p>
              </div>
              <div className="flex w-full items-center justify-center rounded-md bg-[#2a3942] px-2">
                <HiSearch
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => searchUsersFC()}
                />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="w-full rounded-md bg-inherit p-1 outline-none"
                  placeholder="Search users"
                />
              </div>
              <div className="space-y-5">
                {data?.searchUsers &&
                  data.searchUsers.map((user) => (
                    <div
                      className={`flex cursor-pointer items-center space-x-3 rounded-xl  p-3 transition duration-300 ${
                        selectedUsers.some((user) => user.id === user.id)
                          ? "bg-[#2a3942] hover:bg-[#2a3942]/25"
                          : "bg-[#2a3942]/25 hover:bg-[#2a3942]"
                      }`}
                      onClick={() => {
                        const checkArray = selectedUsers.some(
                          (user) => user.id === user.id
                        );
                        checkArray
                          ? deleteSelectedUsers(user.id)
                          : addSelectedUsers(user.id);
                      }}>
                      <Image
                        src={""}
                        height={30}
                        width={30}
                        className="flex-shrink-0 rounded-full border object-contain"
                        alt=""
                      />
                      <h2>{user.username}</h2>
                      {selectedUsers.some((user) => user.id === user.id) && (
                        <HiCheck className="flex h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="mx-5 my-5">
              <button
                className="flex w-full rounded-2xl bg-[#2a3942] p-2 hover:opacity-75"
                onClick={() => {
                  setSlideBarOpen(false);
                  createFC();
                }}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchUser;
