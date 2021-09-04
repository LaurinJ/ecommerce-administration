import React from "react";

function Header() {
  return (
    <div className="fixed top-0 w-full pr-5 flex justify-end items-center h-14 border-b border-gray-300 bg-gray-200">
      <ul className="flex space-x-4 items-center text-gray-800 text-sm font-light cursor-pointer">
        <li>Web site</li>
        <li className="relative">
          <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
          <div className="absolute -top-2 left-2 flex justify-center items-center bg-green-500 w-4 h-4 rounded-full">
            <spam className="text-white font-normal">3</spam>
          </div>
        </li>
        {/* dropdown */}
        <li className="flex items-center relative">
          <img src="profile.jpg" alt="Profile images" className="w-8 h-8 mr-1 rounded-full" />
          Josef Laurin
          <i className="fa fa-sort-desc ml-1 pb-1" aria-hidden="true"></i>
          <div className="hidden top-9 -right-4 w-28">
            <ul className="bg-white border border-gray-300">
              <li className="pl-3 py-1 hover:text-gray-500">Profile</li>
              <li className="pl-3 py-1 hover:text-gray-500">Settings</li>
              <li className="pl-3 py-1 hover:text-gray-500">
                Log Out <i className="fa fa-sign-out ml-3" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
