import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_ORDERS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { SEARCH } from "../queries/Query";
import Pagination from "../components/Pagination";
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
