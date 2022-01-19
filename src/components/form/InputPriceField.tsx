import React from "react";

export function InputFieldAdm(props: any) {
  // element and type validation
  const required = props.required || false;

  return (
    <div className="form_input flex items-center space-x-2">
      <div className=" text-base font-semibold text-gray-700 xl:text-lg">
        <label>{props.label}:</label>
      </div>
      <div>
        {/* vykreslení aktuálního elementu */}
        <input
          required={required}
          type="number"
          className={`w-32 p-3 bg-gray-100 ${
            props.error ? "border border-red-600 " : ""
          }`}
          placeholder={props.prompt}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
        {props.error && (
          <div className="flex items-center mt-1 lg:text-base xl:text-lg text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {props.error}
          </div>
        )}
      </div>
      <span>Kč</span>
    </div>
  );
}

export default InputFieldAdm;
