import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ANSWER_CONTACT_MESSAGE } from "../../queries/Mutation";

interface Props {
  id: string;
  email: string;
}

function ContactForm({ id, email }: Props) {
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(ANSWER_CONTACT_MESSAGE, {
    onCompleted: () => {
      setMessage("");
      // odesl
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
          answerContactMessageId: id,
          message: { content: message, email: email },
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
        placeholder="Pošlete odpověd"
        aria-required="true"
        rows={15}
        value={message}
        maxLength={10000}
        onChange={handleChange}
      ></textarea>
      <button className="px-4 mb-4 flex justify-center items-end" type="submit">
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

export default ContactForm;
