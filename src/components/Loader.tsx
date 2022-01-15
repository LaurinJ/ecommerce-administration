import React from "react";

function Loader() {
  return (
    <div className="absolute w-full h-full flex items-center justify-center bg-gray-50 opacity-50">
      <div className="w-20 h-20 border-t-2 border-l-2 border-b-2 border-green-900 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
