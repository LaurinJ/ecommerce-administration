/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useReactiveVar, useQuery } from "@apollo/client";
import { userData } from "../apollo-client";
import Logout from "./account/Logout";
import { GET_CONTACT_MESSAGE_COUNT } from "../queries/Query";

function Header() {
  const [open, setOpen] = useState(false);
  const user = useReactiveVar(userData);

  const { data } = useQuery(GET_CONTACT_MESSAGE_COUNT);

  return (
    <div className="md:fixed top-0 w-full max-w-[1400px] z-20 pr-5 flex justify-end items-center h-14 border-b border-gray-300 bg-gray-100">
      <ul className="flex space-x-4 mr-3 items-center text-gray-800 text-sm font-light cursor-pointer">
        <li>
          <a href="http://localhost:3000/">Zobrazit eshop</a>
        </li>
        <Link to="/contact-message">
          <li className="relative">
            <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
            <div className="absolute -top-2 left-2 flex justify-center items-center bg-green-500 w-5 h-4 rounded-full">
              <span className="text-white font-normal">
                {data?.getContactMessagesCount.messages}
              </span>
            </div>
          </li>
        </Link>
        {/* dropdown */}
        <li
          className="flex items-center relative"
          onClick={() => setOpen(!open)}
        >
          <img
            src={`http://localhost:4000/${user?.profile.profile_image}`}
            alt="Profile photo."
            className="w-8 h-8 mr-1 rounded-full"
          />
          {user.name}
          <i className="fa fa-sort-desc ml-1 pb-1" aria-hidden="true"></i>
          <div
            className={`${open ? "" : "hidden"} absolute top-9 -right-4 w-28`}
          >
            <ul className="bg-white border border-gray-300">
              <Link to="/account/profile">
                <li className="pl-3 py-1 hover:text-gray-500">Profile</li>
              </Link>

              <Link to="/account/login">
                <li className="pl-3 py-1 hover:text-gray-500">
                  <Logout />
                </li>
              </Link>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
