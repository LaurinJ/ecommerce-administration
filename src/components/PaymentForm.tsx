import React, { useState, useEffect } from "react";
import InputFieldAdm from "../components/form/InputFieldAdm";
import FileInputField from "../components/form/FileInputField";

function PaymentForm() {
  interface Errors {
    name?: String;
    image?: String;
  }

  const [formValues, setFormValues] = useState({
    name: "",
    image: {},
  });
  const [err, setErr] = useState<Errors>({});
  //   const [address, { data, loading, error }] = useMutation(
  //     PERSON_ADDRESS_MUTATION
  //   );

  useEffect(() => {
    // setValues({ ...values });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [String(name)]: value });
  };

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files;

    setFormValues({ ...formValues, image: { ...value } });
  };

  const handleSubmit = async (eevent: React.MouseEvent<HTMLButtonElement>) => {
    try {
      console.log(formValues);
      const errors = validate(formValues);
      console.log(errors);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        // setLocalStorage("address", formValues);
        console.log(formValues);

        // await address({
        //   variables: {
        //     person: {
        //       email: formValues.email,
        //       first_name: formValues.first_name,
        //       last_name: formValues.last_name,
        //       phone: Number(formValues.phone),
        //     },
        //     address: {
        //       village: formValues.village,
        //       street: formValues.street,
        //       postCode: Number(formValues.postCode),
        //       numberDescriptive: Number(formValues.numberDescriptive),
        //     },
        //   },
        // });
      }
    } catch (error) {
      console.log(error);
      // setErr(error.graphQLErrors[0].extensions.errors);
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
        <div className="w-full">
          <InputFieldAdm
            required={true}
            type="text"
            name="name"
            label="Jméno platby"
            prompt="Zadejte Jméno"
            error={err.name}
            value={formValues.name}
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
