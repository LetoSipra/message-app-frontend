import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

import SearchUser from "./SearchUser";
import { useQuery } from "@apollo/client";
import chats from "@/graphql/Operations/chats";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [slideBarOpen, setSlideBarOpen] = useState<boolean>(false);
  const { data, error, loading } = useQuery(chats.Queries.chats);
console.log("here", data);

  return (
    <>
      <div className="relative h-full border-r border-gray-700">
        <SearchUser
          slideBarOpen={slideBarOpen}
          setSlideBarOpen={setSlideBarOpen}
        />
        <div className="flex justify-between">
          <div>avatar</div>
          <div>
            <button onClick={() => setSlideBarOpen(!slideBarOpen)}>
              search
            </button>
            {/* new chat>modal */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
