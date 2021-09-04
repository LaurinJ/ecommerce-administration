import React from "react";

function Sitebar() {
  return (
    <div className="w-56 p-0 relative z-50 text-gray-200 bg-gray-700">
      {/* title */}
      <div className="w-56 h-14 mb-2 flex justify-center items-center space-x-2.5 font-black">
        <i class="fa fa-buysellads fa-2x" aria-hidden="true"></i>
        <span>Bygbuy Dashboard</span>
      </div>
      {/* profile */}
      <div className="flex mb-2">
        <div className="mx-3">
          <img src="profile.jpg" alt="..." className="w-12 h-12 rounded-full" />
        </div>
        <div className="mx-3 font-normal">
          <spam className="text-gray-400">Welcome,</spam>
          <h2>Josef Laurin</h2>
        </div>
      </div>
      {/* nav link */}
      <div className="mt-5">
        <ul className="block text-sm font-light cursor-pointer">
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i className="fa fa-home fa-lg w-8" aria-hidden="true"></i>Home
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i class="fa fa-table fa-lg w-8" aria-hidden="true"></i>Form
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i class="fa fa-desktop fa-lg w-8" aria-hidden="true"></i>Product
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i class="fa fa-bar-chart fa-lg w-8" aria-hidden="true"></i>Data
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i className="fa fa-wrench fa-lg w-8" aria-hidden="true"></i>Global settings
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i class="fa fa-envelope fa-lg w-8" aria-hidden="true"></i>Email
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i class="fa fa-info fa-lg w-8" aria-hidden="true"></i>Django info
            </a>
          </li>
          <li className="mb-2 px-4 py-3 hover:text-white">
            <a href="/#">
              <i class="fa fa-android fa-lg w-8" aria-hidden="true"></i>Golden Farm
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sitebar;
