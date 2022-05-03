import React, { useState, useEffect } from "react";
import { useSubscription, useMutation } from "@apollo/client";
import { v4 } from "uuid";
import { MESSAGES_SUBSCRIPTION } from "../queries/Subscription";
import { DELETE_ADMIN_TOKEN, SET_ADMIN_TOKEN } from "../queries/Mutation";
import { Chat } from "./Chat";
import { setLocalStorage, getLocalStorage } from "../actions/auth";

function ChatWrapper() {
  interface List {
    [index: number]: string;
  }
  const [list, setList] = useState<List[]>([]);
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");

  const { data } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { getMessagesId: chatId },
  });
  const [setAdminToken] = useMutation(SET_ADMIN_TOKEN, {
    onCompleted: () => {
      setOnline(true);
    },
  });
  const [deleteAdminToken] = useMutation(DELETE_ADMIN_TOKEN, {
    onCompleted: () => {
      setOnline(false);
    },
  });

  const handleChange = (user: string) => {
    if (user === userId) {
      // setUserId("");
      setOpen(!open);
    } else {
      setUserId(user);
      setOpen(true);
    }
  };

  const handleChatStatus = (event: React.MouseEvent<HTMLElement>) => {
    if (online) {
      deleteAdminToken({
        variables: {
          token: chatId,
        },
      });
    } else {
      setAdminToken({
        variables: {
          token: chatId,
        },
      });
    }
  };

  useEffect(() => {
    let id = getLocalStorage("chatId");
    if (!id) {
      let id = v4();
      setLocalStorage("chatId", id);
      setChatId(id);
    } else {
      setChatId(id);
    }
  }, [chatId]);

  useEffect(() => {
    if (data) {
      console.log(data);

      if (
        data.shareMessage.from !== chatId &&
        list.includes(data.shareMessage.from) === false
      ) {
        setList([...list, data.shareMessage.from]);
      }
    }
  }, [data, list, chatId]);

  return (
    <div className={`fixed bottom-24 lg:bottom-4 right-2 z-40`}>
      <div
        className={`${
          open ? "" : "hidden"
        } h-[450px] max-w-[300px] esm:max-w-none lg:w-[300px] lg:h-[500px] mb-3 flex flex-col bg-white shadow-2xl rounded-2xl`}
      >
        <div className=" bg-gray-800 rounded-t-2xl">
          <h2 className="flex text-white text-xl font-semibold py-3 pl-7">
            <div
              className={`${
                online ? "bg-green-500" : "bg-red-700"
              } my-auto w-4 h-4 mr-2 rounded-full cursor-pointer`}
              onClick={handleChatStatus}
            ></div>
            BigBuy.cz --{userId}
          </h2>
        </div>
        {/* <Chat /> */}
        <Chat open={open} user={userId} adminToken={chatId} />
      </div>
      <button
        className="w-16 h-16 ml-auto flex items-center justify-center bg-black rounded-full"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {!open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
      <div className="fixed flex space-x-2 bottom-24 lg:bottom-2 right-20 z-60">
        {list.length > 0 &&
          list.map((value, i) => {
            return (
              <div key={i} className="flex flex-col mr-auto max-w-[220px]">
                <span
                  className={`${
                    userId === value && "bg-green-400"
                  } py-2 px-2 max-w-max mr-auto bg-gray-200 rounded-xl hover:bg-green-400 cursor-pointer z-20`}
                  onClick={() => {
                    handleChange(String(value));
                  }}
                >
                  {value}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatWrapper;
