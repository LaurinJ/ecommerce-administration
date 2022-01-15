import React, { useState, useEffect } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import InputFieldAdm from "./InputFieldAdm";
import InputField33 from "./InputField33";
import FileInputField from "./FileInputField";
import InputCheckBox from "./InputCheckBox";
import { CREATE_DELIVER_METHOD } from "../../queries/Mutation";

function DeliverForm() {
  interface Errors {
    name?: String;
    price?: String;
    image?: String;
  }

  interface State {
    name?: String;
    price?: Number;
    image?: Object;
    hidden?: Boolean;
  }

  const [formValues, setFormValues] = useState<State>({
    name: "",
    price: 0,
    hidden: false,
  });
  const [err, setErr] = useState<Errors>({});
  const [createDeliver, { data }] = useMutation(CREATE_DELIVER_METHOD);

  useEffect(() => {}, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "hidden") {
      setFormValues({ ...formValues, [String(name)]: !formValues.hidden });
    } else {
      setFormValues({ ...formValues, [String(name)]: value });
    }
  };

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files && event.target.files[0];
    console.log(value);

    if (!value) {
      return;
    }
    setFormValues({ ...formValues, image: value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      console.log(formValues);
      const errors = validate(formValues);
      console.log(errors);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        await createDeliver({
          variables: {
            deliver: {
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

  const validate = (values: any) => {
    const errors: Errors = {};
    if (!values.name) {
      errors.name = "Toto pole je povinné";
    }
    if (!values.price) {
      errors.price = "Toto pole je povinné";
    }
    return errors;
  };

  return (
    <>
      <form
        className="flex flex-wrap md:flex-nowrap lg:space-x-10 "
        encType="multipart/form-data"
      >
        <div className="w-full">
          <InputFieldAdm
            required={true}
            type="text"
            name="name"
            label="Jméno dopravy"
            prompt="Zadejte Jméno"
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
            checked={false}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full bg-white">
          <FileInputField
            required={true}
            label="Logo dopravy"
            //   error={err.first_name}
            handleChange={handleChangeImage}
          />
        </div>
      </form>
      <div className="flex mt-7 mx-auto justify-center">
        <button
          onClick={handleSubmit}
          className="py-1 px-2 bg-green-500 rounded-md"
        >
          Přidat způsob dopravy
        </button>
      </div>
    </>
  );
}

export default DeliverForm;
