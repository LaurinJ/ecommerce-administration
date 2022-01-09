import React, { useState, useEffect } from "react";
import InputField from "../../components/form/InputField";

function Login() {
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
  //   const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  //   useEffect(() => {
  // if (data) {
  //   console.log("log inn");
  //   console.log(data);
  //   authenticate(data.login, () => {
  //     dispatch({
  //       type: "SUCCESS",
  //       message: "Přihlášení bylo úspěšné",
  //       title: "Successful Request",
  //     });
  //     Router.push(`/account`);
  //   });
  // }
  //   }, [data]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const errors = validate(formValues);
      setErr(errors);
      //   if (Object.keys(errors).length === 0) {
      //     await login({
      //       variables: { user: { ...formValues } },
      //     });
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values: any) => {
    const errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Toto pole je povinné";
    } else if (!regex.test(values.email)) {
      errors.email = "Email je ve špatném formátu";
    }
    if (!values.password) {
      errors.password = "Toto pole je povinné";
    }
    return errors;
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        className="max-w-[450px] p-8 shadow-xl lg:text-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 lg:text-3xl font-semibold text-gray-600">
          Přihlášení do účtu
        </h2>
        {/* error response */}
        {/* <span className="text-red-600">{error && error.message}</span> */}
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
    </div>
  );
}

export default Login;
