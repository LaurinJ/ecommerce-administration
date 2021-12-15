import React from "react";

function Counter({ count, countHandle }) {
  const changeHandle = (e) => {
    let value = e.target.value;
    countHandle(value);
  };
  console.log("render");
  return (
    <div className="h-14 p-[10px] inline-block border border-gray-300 rounded-md text-2xl leading-6">
      <button
        className="w-6"
        onClick={() => {
          countHandle(count - 1);
        }}
      >
        -
      </button>
      <input
        className="w-12 text-center"
        type="number"
        value={count}
        onChange={(e) => {
          changeHandle(e);
        }}
      />
      <button
        className="w-6"
        onClick={() => {
          countHandle(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
