import React from "react";

function InputCheck(props) {
  // podporované typy pro element input
  const INPUTS = ["checkbox", "radio"];

  // validace typu
  const type = props.type.toLowerCase();
  const checked = props.checked || "";

  if (!INPUTS.includes(type)) {
    return null;
  }

  return (
    <label className="flex justify-between items-center w-full radio px-10 py-1 mb-3 sm:mb-0 leading-9 border border-primary bg-lg_blue xl:text-[22px] cursor-pointer">
      <input
        type={props.type}
        className="form-check-input"
        name={props.name}
        value={props.value}
        defaultChecked={checked}
        onChange={props.handleChange}
      />
      {props.label}
      {props.svg ? (
        props.svg
      ) : (
        <img className="h-9 w-12" src={props.img} alt={props.name} />
      )}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg> */}
      <span></span>
    </label>
  );
}

export default InputCheck;
