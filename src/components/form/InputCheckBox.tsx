import React from "react";

function InputCheckBox(props: any) {
  const checked = props.checked || false;

  return (
    <label htmlFor="checkbox" className="relative flex cursor-pointer">
      <input
        type="checkbox"
        id="checkbox"
        name={props.name}
        // value={props.value}
        defaultChecked={checked}
        onChange={props.handleChange}
        className="appearance-none h-6 w-6 border-2 border-gray-600 rounded-md mr-2"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute left-[2px] top-[2px] text-opacity-0 text-primary check-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {props.label}
    </label>
  );
}

export default InputCheckBox;
