import React, { useState, useEffect } from "react";

function MultipleFileInputField(props: any) {
  const [img, setImg] = useState<string | ArrayBuffer | null>("");
  // element and type validation
  const required = props.required || false;

  const imageReader = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader);

      let img1 = reader.result;
      // console.log(img1);

      setImg(img1);
    });
    if (event.target.files) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (props.img) {
      setImg("http://localhost:4000/" + props.img);
    }
  }, [props.img]);

  return (
    <div className="form_input">
      <div className="mt-4">
        {/* vykreslení aktuálního elementu */}
        <h5>{props.label}</h5>
        <hr />
        <small>Max velikost obrázku: 1mb</small>
        <br />
        <label className="inline-block mt-2 py-1 px-2 bg-green-500 rounded-md">
          Nahrát
          <input
            required={required}
            multiple={props.multiple}
            type="file"
            accept="image/"
            hidden
            className={`w-full p-3 bg-gray-100 ${
              props.error ? "border-red-600 " : ""
            }`}
            onChange={(e) => {
              imageReader(e);
              props.handleChange(e);
            }}
          />
        </label>
      </div>
      {img && (
        <img
          className="mt-5"
          src={String(img)}
          width={100}
          height={100}
          alt="logo"
        />
      )}
      {props.error && (
        <div className=" flex items-center mt-1 lg:text-base xl:text-lg text-red-600">
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
  );
}

export default MultipleFileInputField;
