import Image from "next/image";
import React from "react";

interface Props {
  user: {
    id: string;
    username: string;
  };
}

function SearchedUsers({ user }: Props) {
  return (
    <div
      key={user.id}
      className="flex cursor-pointer items-center space-x-3 rounded-xl bg-[#2a3942]/25 p-3 transition duration-300 hover:bg-[#2a3942]">
      <Image
        src={""}
        height={30}
        width={30}
        className="flex-shrink-0 rounded-full border object-contain"
        alt=""
      />
      <h2>{user.username}</h2>
    </div>
  );
}

export default SearchedUsers;
