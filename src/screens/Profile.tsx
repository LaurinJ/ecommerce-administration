/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import { userData } from "../apollo-client";

export default function Profile() {
  const user = useReactiveVar(userData);

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="w-56 text-2xl">Nastavení profilu</h1>
      </div>
      <div className="screen_container">
        <div className="mx-auto max-w-[300px] shadow-2xl rounded-lg">
          <div className="flex flex-col justify-center items-center">
            <img
              src={`http://localhost:4000/${user?.profile.profile_image}`}
              alt="Profile photo."
              className="w-40 h-40 mr-1 rounded-full"
            />
            <div className="flex flex-col justify-center items-center my-3">
              <span>{user.name}</span>
              <span>{user.email}</span>
              <Link to={"/account/edit-profile"}>
                <span className="text-blue-500 hover:text-blue-700">
                  Nahrát obrazek
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
