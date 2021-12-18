import React, { useState, useEffect } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import InputFieldAdm from "../components/form/InputFieldAdm";
import FileInputField from "../components/form/FileInputField";
import InputCheckBox from "../components/form/InputCheckBox";
import { CREATE_PAYMENT_METHOD } from "../queries/Mutation";

function PaymentForm() {
  interface Errors {
    name?: String;
    image?: String;
  }

  interface State {
    name?: String;
    image?: Object;
    hidden?: Boolean;
  }

  const [formValues, setFormValues] = useState<State>({
    name: "",
    hidden: false,
  });
  const [err, setErr] = useState<Errors>({});
  const [createPayment, { data }] = useMutation(CREATE_PAYMENT_METHOD);

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
        await createPayment({
          variables: {
            payment: {
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

  const validate = (values: any) => {
    const errors: Errors = {};
    if (!values.name) {
      errors.name = "Toto pole je povinné";
    }
    return errors;
  };

  return (
    <>
      <form
        className="flex flex-wrap md:flex-nowrap lg:space-x-10 "
        encType="multipart/form-data"
      >
        {/* <span>{error && error.graphQLErrors[0].extensions.errors}</span> */}
        <div className="w-full">
          <InputFieldAdm
            required={true}
            type="text"
            name="name"
            label="Jméno platby"
            prompt="Zadejte Jméno"
            error={err?.name}
            value={formValues.name}
            handleChange={handleChange}
          />

          <InputCheckBox
            name="hidden"
            label="Zobrazení platby"
            checked={false}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full bg-white">
          <FileInputField
            required={true}
            label="Logo platby"
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
          Přidat způsob platby
        </button>
      </div>
    </>
  );
}

export default PaymentForm;
