import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../queries/Mutation";

function MessageForm() {
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      setMessage("");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length !== 0) {
      sendMessage({
        variables: {
          message: { content: message, to: "user", from: "admin" },
        },
      });
    }
  };

  return (
    <form
      className="flex border border-gray-300 rounded-3xl"
      onSubmit={handleSubmit}
    >
      <textarea
        className="py-3 px-4 flex-grow rounded-l-3xl overflow-hidden outline-none resize-none"
        placeholder="Pošlete nám zprávu"
        aria-required="true"
        rows={1}
        value={message}
        maxLength={10000}
        onChange={handleChange}
      ></textarea>
      <button className="px-4 flex justify-center items-center" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </button>
    </form>
  );
}

export default MessageForm;
