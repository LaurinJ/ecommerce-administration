import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userName } from "../apollo-client";

function Sitebar() {
  const [menu, setMenu] = useState(false);
  const [openPay, setOpenPay] = useState(false);

  return (
    <div className="w-56 p-0 relative z-40 text-gray-200 bg-gray-700">
      {/* title */}
      <div className="w-56 h-14 mb-2 flex justify-center items-center space-x-2.5 font-black">
        <i className="fa fa-buysellads fa-2x" aria-hidden="true"></i>
        <span>Bygbuy Dashboard</span>
      </div>
      {/* profile */}
      <div className="flex mb-2">
        <div className="mx-3">
          <img src="profile.jpg" alt="..." className="w-12 h-12 rounded-full" />
        </div>
        <div className="mx-3 font-normal">
          <span className="text-gray-400">Welcome,</span>
          <h2>{userName()}</h2>
        </div>
      </div>
      {/* nav link */}
      <div className="mt-5">
        <ul className="block text-sm font-light cursor-pointer">
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i className="fa fa-table fa-lg w-8" aria-hidden="true"></i>Home
            </a>
          </li>
          <li className="mb-2 px-4 py-3">
            <a href="/#">
              <i className="fa fa-home fa-lg w-8" aria-hidden="true"></i>Form
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <i className="fa fa-desktop fa-lg w-8" aria-hidden="true"></i>
            <span>Product</span>
            <button
              className="ml-3"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              otevri
            </button>
            <ul className={`ml-3 ${menu ? "" : "hidden"}`}>
              <li className="mt-1 p-1 hover:text-white hover:bg-gray-800">
                <Link to="/add-product" className="block">
                  New
                </Link>
              </li>
              <li className="mt-1 p-1 hover:text-white hover:bg-gray-800">
                <Link to="/products" className="block">
                  List
                </Link>
              </li>
              <li className="mt-1 p-1 hover:text-white hover:bg-gray-800">
                Delete
              </li>
            </ul>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <i className="fa fa-desktop fa-lg w-8" aria-hidden="true"></i>
            <Link to="/payments">
              <span>Způsob platby</span>
            </Link>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <i className="fa fa-desktop fa-lg w-8" aria-hidden="true"></i>
            <Link to="/deliver-method">
              <span>Způsob dopravy</span>
            </Link>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <i className="fa fa-envelope fa-lg w-8" aria-hidden="true"></i>
            <Link to="/chats">
              <span>Chaty</span>
            </Link>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i className="fa fa-info fa-lg w-8" aria-hidden="true"></i>Django
              info
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i className="fa fa-android fa-lg w-8" aria-hidden="true"></i>
              Golden Farm
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sitebar;
