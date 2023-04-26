import React, { useEffect, useState } from "react";
import SearchUser from "./SearchUser";
import { useQuery } from "@apollo/client";
import chats from "@/graphql/Operations/chats";
import { getSession } from "next-auth/react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [slideBarOpen, setSlideBarOpen] = useState<boolean>(false);
  //add types & ssr
  const { data, error, loading, subscribeToMore } = useQuery<any, any>(
    chats.Queries.chats
  );
  console.log("here", data);

  const subscribeChatUpdates = () => {
    console.log("fire");

    subscribeToMore({
      document: chats.Subscriptions.chatCreated,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("data", subscriptionData);
        console.log("prev", prev);
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.chatCreated;

        return Object.assign({}, prev, {
          chats: [newChat, ...prev.chats],
        });
      },
    });
  };

  useEffect(() => {
    subscribeChatUpdates();
  }, []);

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
          </div>
        </div>
        {data &&
          data?.chats?.map((data: any) => <div key={data.id}>{data.id}</div>)}
      </div>
    </>
  );
}

export default Sidebar;
