import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_MESSAGE } from "../queries/Query";
import ContactForm from "../components/form/ContactForm";

interface Params {
  id: string;
}

function Message() {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_CONTACT_MESSAGE, {
    variables: {
      getContactMessageId: id,
    },
  });
  console.log(data);

  return (
    <div className="mx-auto w-full">
      <button
        className="p-2 bg-blue-300 rounded-sm"
        onClick={() => {
          history.goBack();
        }}
      >
        Zpět
      </button>
      <div className="my-4 p-4 bg-gray-100 rounded-md">
        <span className="font-medium">{data?.getContactMessage.email}</span>
        <p>{data?.getContactMessage.content}</p>
      </div>
      <ContactForm />
    </div>
  );
}

export default Message;
