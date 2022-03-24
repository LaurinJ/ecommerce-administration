import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CONTACT_MESSAGE } from "../queries/Query";
import { SET_READ_CONTACT_MESSAGE } from "../queries/Mutation";
import ContactForm from "../components/form/ContactForm";

interface Params {
  id: string;
}

function Message() {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_CONTACT_MESSAGE, {
    nextFetchPolicy: "network-only",
    variables: {
      getContactMessageId: id,
    },
  });
  const [setRead] = useMutation(SET_READ_CONTACT_MESSAGE);

  useEffect(() => {
    if (data && data.getContactMessage.read === false) {
      setRead({
        variables: {
          readContactMessageId: id,
        },
      });
    }
  }, [id]);

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
      {/* {data && data.getContactMessage.messages} */}
      <div className="my-4 p-4 bg-gray-100 rounded-md">
        <span className="font-medium">{data?.getContactMessage.email}</span>
        <p>{data?.getContactMessage.content}</p>
      </div>
      <ContactForm email={data?.getContactMessage.email} />
    </div>
  );
}

export default Message;
