/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_ORDERS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { SEARCH } from "../queries/Query";
import Pagination from "../components/Pagination";
import ChangePasswordForm from "../components/form/ChangePasswordForm";
import { isAuth } from "../actions/auth";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    setUser(isAuth());
  }, []);

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="w-56 text-2xl">Nastavení profilu</h1>
      </div>
      <div className="screen_container">
        <div className="mx-auto max-w-[300px] shadow-2xl rounded-lg">
          <div className="flex flex-col justify-center items-center">
            <img
              src="/profile.jpg"
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
