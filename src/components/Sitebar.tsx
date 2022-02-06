/* eslint-disable jsx-a11y/img-redundant-alt */
import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userName } from "../apollo-client";

function Sitebar() {
  const [menu, setMenu] = useState(false);
  const name = useReactiveVar(userName);

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
          <img
            src="/profile.jpg"
            alt="Profile photo"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="mx-3 font-normal">
          <span className="text-gray-400">Welcome,</span>
          <h2>{name}</h2>
        </div>
      </div>
      {/* nav link */}
      <div className="mt-5">
        <ul className="block text-sm font-light cursor-pointer">
          <Link to="/">
            <li className="mb-2 px-4 py-3 hover:text-white">
              <i className="fa fa-table fa-lg w-8" aria-hidden="true"></i>
              <span>Home</span>
            </li>
          </Link>
          <Link to="/orders">
            <li className="mb-2 px-4 py-3 hover:text-white">
              <i
                className="fa fa-shopping-bag fa-lg w-8"
                aria-hidden="true"
              ></i>
              <span>Objednávky</span>
            </li>
          </Link>
          <Link to="/products">
            <li className="mb-2 px-4 py-3 hover:text-white">
              <i className="fa fa-desktop fa-lg w-8" aria-hidden="true"></i>
              <span>Produkty</span>
            </li>
          </Link>
          <Link to="/categories">
            <li className="mb-2 px-4 py-3 hover:text-white">
              <i className="fa fa-list-ul fa-lg w-8" aria-hidden="true"></i>
              <span>Kategorie</span>
            </li>
          </Link>
          <Link to="/payments">
            <li className="mb-2 px-4 py-3 hover:text-white">
              <i className="fa fa-credit-card fa-lg w-8" aria-hidden="true"></i>
              <span>Způsoby platby</span>
            </li>
          </Link>
          <Link to="/delivery-method">
            <li className="mb-2 px-4 py-3 hover:text-white">
              <i className="fa fa-car fa-lg w-8" aria-hidden="true"></i>
              <span>Způsoby dopravy</span>
            </li>
          </Link>
          <Link to="/contact-message">
            <li className="mb-2 px-4 py-3 hover:text-white">
              <i className="fa fa-envelope fa-lg w-8" aria-hidden="true"></i>
              <span className="">Zpravy</span>
            </li>
          </Link>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <i className="fa fa-info fa-lg w-8" aria-hidden="true"></i>
            <a href="/#">Django info</a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <span
              className="w-full"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <i className="fa fa-cogs fa-lg w-8" aria-hidden="true"></i>
              Nastaveni
            </span>

            <ul className={`ml-3 ${menu ? "" : "hidden"}`}>
              <Link to="/add-product" className="block">
                <li className="mt-1 p-1 hover:text-white hover:bg-gray-800">
                  New
                </li>
              </Link>
              <Link to="/products" className="block">
                <li className="mt-1 p-1 hover:text-white hover:bg-gray-800">
                  List
                </li>
              </Link>
              <li className="mt-1 p-1 hover:text-white hover:bg-gray-800">
                Delete
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sitebar;
