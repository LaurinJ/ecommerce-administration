import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import InputField from "../../components/form/InputField";
import { LOGIN_MUTATION } from "../../queries/Mutation";
import Loader from "../../components/Loader";
import { authenticate } from "../../actions/auth";
import { validate } from "../../validators/login";
import { userData } from "../../apollo-client";

function LoginForm() {
  interface Form {
    email: string;
    password: string;
  }
  interface Error {
    email: string;
    password: string;
  }
  const [formValues, setFormValues] = useState<Form>({
    email: "",
    password: "",
  });
  const [err, setErr] = useState<Error>({ email: "", password: "" });
  const history = useHistory();

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      authenticate(data.login, () => {
        userData(data.login.user);
        history.push("/");
      });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const errors = validate(formValues);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        await login({
          variables: { user: { ...formValues } },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <form
        className="max-w-[450px] p-8 shadow-xl lg:text-lg bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 lg:text-3xl font-semibold text-gray-600">
          Přihlášení do účtu
        </h2>
        {/* error response */}
        <span className="text-red-600">{error && error.message}</span>
        {/* email input */}
        <InputField
          required={true}
          type="email"
          name="email"
          label="Email"
          prompt="Zadejte email"
          error={err.email}
          value={formValues.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <InputField
          required={true}
          type="password"
          name="password"
          label="Heslo"
          prompt="Zadejte heslo"
          error={err.password}
          value={formValues.password}
          handleChange={handleChange}
        />
        {/* button login */}
        <div className="w-full my-2">
          <button className="base_btn_form_primary w-full justify-center">
            PŘIHLÁSIT
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
