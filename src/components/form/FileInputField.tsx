import React, { useState, useEffect } from "react";
import { config } from "../../config";

interface Props {
  img?: any;
  required?: boolean;
  label: string;
  error?: string;
  multiple?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileInputField(props: Props) {
  const [img, setImg] = useState<string[] | null[]>([]);
  // element and type validation
  const required = props.required || false;

  const imageReader = (file: File) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });

  const multiImageReader = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let images: string[] = [];
    let files = event.target.files;
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        if (files[i] instanceof File) {
          const file: string = await imageReader(files[i]);
          images.push(file);
        }
      }
      setImg(images);
    }
  };

  useEffect(() => {
    if (props.img && props.img.length !== 0) {
      if (typeof props.img === "string") {
        setImg([`${config.image_LINK}${props.img}`]);
        return;
      }
      if (!(props.img instanceof File)) {
        setImg(
          props.img.map((image: string) => {
            return `${config.image_LINK}${image}`;
          })
        );
      }
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
        <label className="inline-block mt-2 btn">
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
              multiImageReader(e);
              props.handleChange(e);
            }}
          />
        </label>
      </div>
      <div className="flex flex-wrap">
        {img &&
          img.map((image, i) => {
            return (
              <img
                key={i}
                className="mt-5"
                src={String(image)}
                width={150}
                height={150}
                alt={image || "picture"}
              />
            );
          })}
      </div>
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

export default FileInputField;
