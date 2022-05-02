import React from "react";
import ChangePasswordForm from "../components/form/ChangePasswordForm";

export default function ChangePassword() {
  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="w-56 text-2xl">Změna hesla</h1>
      </div>
      <div className="screen_container">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
