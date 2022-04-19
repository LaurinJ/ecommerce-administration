import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import InputField from "./InputField";
// import { CHANGE_PASSWORD } from "../../queries/Mutation";
import { useNotification } from "../../context/NotificationProvider";
import Loader from "../Loader";
import { changePasswordValidator } from "../../validators/passwordValidator";

function ChangePasswordForm() {
  const dispatch = useNotification();
  const [formValues, setFormValues] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });
  const [err, setErr] = useState({});
  // const [changePassword, { data, loading, error }] = useMutation(
  //   CHANGE_PASSWORD,
  //   {
  //     notifyOnNetworkStatusChange: true,
  //     onCompleted: (data) => {
  //       formValues({});
  //       dispatch({
  //         type: "SUCCESS",
  //         message: data.changePassword.message,
  //         title: "Successful Request",
  //       });
  //       // Router.push(`/account`);
  //     },
  //   }
  // );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const errors = changePasswordValidator(formValues);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        // await changePassword({
        //   variables: {
        //     passwords: {
        //       old_password: formValues.old_password,
        //       password: formValues.password,
        //       confirm_password: formValues.confirm_password,
        //     },
        //   },
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-[410px] m-4 relative">
      {/* {loading && <Loader />} */}
      <form className="p-8 shadow-xl lg:text-lg" onSubmit={handleSubmit}>
        <h2 className="mb-4 lg:text-3xl font-semibold text-gray-600">
          Změna hesla
        </h2>
        {/* error response */}
        {/* <span className="text-red-600">{error && error.message}</span> */}
        {/* old password input */}
        <InputField
          required={true}
          type="password"
          name="old_password"
          label="Staré heslo"
          prompt="Zadejte staré heslo"
          error={err.old_password}
          value={formValues.old_password}
          handleChange={handleChange}
        />
        {/*new password input */}
        <InputField
          required={true}
          type="password"
          name="password"
          label="Nové heslo"
          prompt="Zadejte nové heslo"
          error={err.password}
          value={formValues.password}
          handleChange={handleChange}
        />
        {/* confirm password input */}
        <InputField
          required={true}
          type="password"
          name="confirm_password"
          label="Potvrzení hesla"
          prompt="Potvrzení hesla"
          error={err.confirm_password}
          value={formValues.confirm_password}
          handleChange={handleChange}
        />
        {/* button login */}
        <div className="w-full my-2">
          <button className="base_btn_form_primary w-full justify-center">
            Změnit heslo
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
