import React, { useState, useEffect } from "react";
import { ApolloError, useMutation, useLazyQuery } from "@apollo/client";
import InputFieldAdm from "./InputFieldAdm";
import InputField33 from "./InputField33";
import FileInputField from "./FileInputField";
import InputCheckBox from "./InputCheckBox";
import Loader from "../Loader";
import {
  CREATE_DELIVER_METHOD,
  EDIT_DELIVER_METHOD,
} from "../../queries/Mutation";
import { GET_DELIVERY_METHOD, GET_DELIVERY_METHODS } from "../../queries/Query";
import { validate } from "../../validators/delivery";
import { useNotification } from "../../context/NotificationProvider";

import { Delivery, DeliveryErrors } from "../../type/delivery";

interface Props {
  id: string;
}

function DeliveryForm({ id }: Props) {
  const dispatch = useNotification();
  const [formValues, setFormValues] = useState<Delivery>({
    _id: "",
    name: "",
    price: 0,
    image: "",
    hidden: false,
  });
  const [err, setErr] = useState<DeliveryErrors>({});

  const [getDelivery] = useLazyQuery(GET_DELIVERY_METHOD, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setFormValues({ ...data.getDeliveryMethod });
    },
  });

  const Mutation = id ? EDIT_DELIVER_METHOD : CREATE_DELIVER_METHOD;
  const [createDeliver, { loading }] = useMutation(Mutation, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [GET_DELIVERY_METHODS],
    onCompleted: () => {
      setFormValues({
        _id: "",
        name: "",
        price: 0,
        image: "",
        hidden: false,
      });
      dispatch({
        type: "SUCCESS",
        message: "Způsob dopravy byl vytvořen!",
        title: "Successful Request",
      });
    },
  });

  useEffect(() => {
    if (id) {
      getDelivery({
        variables: {
          getDeliveryMethodId: id,
        },
      });
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "hidden") {
      setFormValues({ ...formValues, [String(name)]: event.target.checked });
    } else {
      setFormValues({ ...formValues, [String(name)]: value });
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
        await createDeliver({
          variables: {
            delivery: {
              _id: formValues._id,
              name: formValues.name,
              price: Number(formValues.price),
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
            label="Název dopravy"
            prompt="Zadejte Název"
            error={err?.name}
            value={formValues.name}
            handleChange={handleChange}
          />

          <InputField33
            required={true}
            type="number"
            name="price"
            label="Cena"
            prompt="Zadejte cenu"
            error={err?.price}
            value={formValues.price}
            handleChange={handleChange}
          />

          <InputCheckBox
            name="hidden"
            label="Zobrazení dopravy"
            checked={formValues.hidden}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full lg:ml-10 bg-white">
          <FileInputField
            img={formValues.image}
            required={true}
            label="Logo dopravy"
            handleChange={handleChangeImage}
          />
        </div>
      </form>
      <div className="flex mt-7 mx-auto justify-center">
        <button onClick={handleSubmit} className="btn">
          {id ? "Aktualizovat způsob dopravy" : "Přidat způsob dopravy"}
        </button>
      </div>
    </>
  );
}

export default DeliveryForm;
