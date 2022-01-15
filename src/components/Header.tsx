import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userName } from "../apollo-client";
import Logout from "./account/Logout";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className=" md:fixed top-0 w-full max-w-[1400px] z-20 pr-5 flex justify-end items-center h-14 border-b border-gray-300 bg-gray-100">
      <ul className="flex space-x-4 mr-3 items-center text-gray-800 text-sm font-light cursor-pointer">
        <li>
          <a href="http://localhost:3000/">Zobrazit eshop</a>
        </li>
        <Link to="/contact-message">
          <li className="relative">
            <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
            <div className="absolute -top-2 left-2 flex justify-center items-center bg-green-500 w-4 h-4 rounded-full">
              <span className="text-white font-normal">3</span>
            </div>
          </li>
        </Link>
        {/* dropdown */}
        <li
          className="flex items-center relative"
          onClick={() => setOpen(!open)}
        >
          <img
            src="profile.jpg"
            alt="Profile images"
            className="w-8 h-8 mr-1 rounded-full"
          />
          {userName()}
          <i className="fa fa-sort-desc ml-1 pb-1" aria-hidden="true"></i>
          <div
            className={`${open ? "" : "hidden"} absolute top-9 -right-4 w-28`}
          >
            <ul className="bg-white border border-gray-300">
              <li className="pl-3 py-1 hover:text-gray-500">Profile</li>
              <li className="pl-3 py-1 hover:text-gray-500">Settings</li>

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
