import React from "react";
import { countItem } from "../../actions/cart";
function Counter({ count, id }) {
  const changeHandle = (e) => {
    let value = e.target.value;
    countItem(id, Number(value));
  };
  return (
    <div className="h-14 p-[10px] inline-block border border-gray-300 rounded-md text-2xl leading-6">
      <button
        className="w-6"
        onClick={() => {
          countItem(id, count - 1);
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
          countItem(id, count + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
