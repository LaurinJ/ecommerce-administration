import React, { useState, useEffect } from "react";
import { ApolloError, useMutation, useLazyQuery } from "@apollo/client";
import InputFieldAdm from "./InputFieldAdm";
import FileInputField from "./FileInputField";
import InputCheckBox from "./InputCheckBox";
import {
  CREATE_PAYMENT_METHOD,
  EDIT_PAYMENT_METHOD,
} from "../../queries/Mutation";
import { GET_PAYMENT_METHOD, GET_PAYMENT_METHODS } from "../../queries/Query";
import Loader from "../Loader";
import { validate } from "../../validators/payment";
import { useNotification } from "../../context/NotificationProvider";

import { Payment, PaymentErrors } from "../../type/payment";

interface Props {
  id: string;
}

function PaymentForm({ id }: Props) {
  const dispatch = useNotification();
  const [formValues, setFormValues] = useState<Payment>({
    _id: "",
    name: "",
    image: "",
    hidden: false,
  });
  const [err, setErr] = useState<PaymentErrors>({});

  const [getPayment] = useLazyQuery(GET_PAYMENT_METHOD, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setFormValues({ ...data.getPaymentMethod });
    },
  });

  const Mutation = id ? EDIT_PAYMENT_METHOD : CREATE_PAYMENT_METHOD;
  const [createPayment, { loading }] = useMutation(Mutation, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [GET_PAYMENT_METHODS],
    onCompleted: () => {
      setFormValues({
        _id: "",
        name: "",
        image: "",
        hidden: false,
      });
      dispatch({
        type: "SUCCESS",
        message: "Způsob platby byl vytvořen!",
        title: "Successful Request",
      });
    },
  });

  useEffect(() => {
    if (id) {
      getPayment({
        variables: {
          getPaymentMethodId: id,
        },
      });
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "hidden") {
      setFormValues({ ...formValues, [String(name)]: event.target.checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files && event.target.files[0];
    if (!value) {
      return;
    }
    setFormValues({ ...formValues, image: value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const errors = validate(formValues);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        await createPayment({
          variables: {
            payment: {
              _id: formValues._id,
              name: formValues.name,
              hidden: formValues.hidden,
            },
            image: formValues.image,
          },
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        setErr(error.graphQLErrors[0].extensions.errors);
      }
    }
  };

  return (
    <>
      <form
        className="flex relative flex-wrap md:flex-nowrap"
        encType="multipart/form-data"
      >
        {loading && <Loader />}
        <div className="w-full">
          <InputFieldAdm
            required={true}
            type="text"
            name="name"
            label="Název platby"
            prompt="Zadejte Název"
            error={err?.name}
            value={formValues.name}
            handleChange={handleChange}
          />

          <InputCheckBox
            name="hidden"
            label="Zobrazení platby"
            checked={formValues.hidden}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full lg:ml-10 bg-white">
          <FileInputField
            img={formValues.image}
            required={true}
            label="Logo platby"
            handleChange={handleChangeImage}
          />
        </div>
      </form>
      <div className="flex mt-7 mx-auto justify-center">
        <button onClick={handleSubmit} className="btn">
          {id ? "Aktualizovat způsob platby" : "Přidat způsob platby"}
        </button>
      </div>
    </>
  );
}

export default PaymentForm;
