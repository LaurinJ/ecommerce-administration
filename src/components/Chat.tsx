import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MESSAGES } from "../queries/Query";
import { MESSAGES_SUBSCRIPTION } from "../queries/Subscription";
import MessageForm from "./form/MessageForm";
import { dateStringFormatter } from "../helpers/dateFormater";

interface Props {
  open?: boolean;
  user?: string;
  adminToken?: string;
}

export const Chat: React.FC<Props> = ({ open, user, adminToken }) => {
  const [getMessages, { data, subscribeToMore }] = useLazyQuery(GET_MESSAGES, {
    variables: { getMessagesId: user },
  });

  const updateScroll = () => {
    let element = document.getElementById("chat");

    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect((): void | null | any => {
    getMessages();
  }, [user]);

  useEffect((): void | null | any => {
    if (subscribeToMore) {
      const updateMessage = subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: { getMessagesId: user },
        updateQuery: (prev, { subscriptionData }) => {
          console.log("sub to more");

          if (!subscriptionData.data) return prev;
          if (subscriptionData.data.shareMessage.from !== user) return;

          const newMessage = subscriptionData.data.shareMessage;
          setTimeout(updateScroll, 100);
          return Object.assign({}, prev, {
            getMessages: [...prev.getMessages, newMessage],
          });
        },
      });
      return () => updateMessage;
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateScroll();
    }, 0);
  }, [open, user]);

  return (
    <div className="flex flex-col h-full justify-between overflow-hidden mx-4 my-3">
      {/* chats */}
      <div className="flex flex-col space-y-3 overflow-auto n_scroll" id="chat">
        {data &&
          data.getMessages.map((message: any, i: KeyType) => {
            return message.from !== adminToken ? (
              <div key={i} className="flex flex-col mr-auto max-w-[220px]">
                <span className="py-3 px-3 max-w-max mr-auto bg-gray-200 rounded-xl">
                  {message.content}
                </span>
                <div className="mr-auto mb-3 mt-2 text-xs text-gray-400">
                  {dateStringFormatter(Number(message.createdAt))}
                </div>
              </div>
            ) : (
              <div key={i} className="flex flex-col ml-auto max-w-[220px]">
                <span className="py-3 px-3 max-w-max ml-auto bg-blue-200 rounded-xl">
                  {message.content}
                </span>
                <div className="ml-auto mb-3 mt-2 text-xs text-gray-400">
                  {dateStringFormatter(Number(message.createdAt))}
                </div>
              </div>
            );
          })}
      </div>
      {/* form */}
      <div className="mt-3">
        <MessageForm to={user} from={adminToken} />
      </div>
    </div>
  );
};
