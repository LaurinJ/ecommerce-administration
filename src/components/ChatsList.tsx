import React, { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { MESSAGES_SUBSCRIPTION } from "../queries/Subscription";
import Chat from "./Chat";

function ChatsList() {
  interface List {
    [index: number]: string;
  }
  const [list, setList] = useState<List[]>([]);
  const [userId, setUserId] = useState("");

  const { data } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { getMessagesId: "admin" },
  });

  const handleChange = (user: any) => {
    if (user == userId) {
      setUserId("");
    } else {
      setUserId(user);
    }
  };

  useEffect(() => {
    if (data) {
      if (list.includes(data.shareMessage.from) == false) {
        console.log(data.shareMessage.from);
        console.log("list", list);

        setList([...list, data.shareMessage.from]);
      }
    }
  }, [data, list]);

  return (
    <div className="fixed flex space-x-2 bottom-24 lg:bottom-2 right-20 z-60">
      {list.length > 0 &&
        list.map((value, i) => {
          return (
            <div key={i} className="flex flex-col mr-auto max-w-[220px]">
              <span
                className={`${
                  userId === value ? "bg-green-400" : ""
                } py-2 px-2 max-w-max mr-auto bg-gray-200 rounded-xl hover:bg-green-400 cursor-pointer z-20`}
                onClick={() => {
                  handleChange(value);
                }}
              >
                {value}
              </span>
            </div>
          );
        })}
      <Chat user={userId} />
    </div>
  );
}

export default ChatsList;
