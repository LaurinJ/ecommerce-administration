import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
// import { Delta as TypeDelta } from "quill";
// import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import slugify from "slugify";
import Loader from "../Loader";
import InputFieldAdm from "./InputFieldAdm";
import InputCheckBox from "./InputCheckBox";
import FileInputField from "./FileInputField";
import MultipleFileInputField from "./MultipleFileInputField";

function ProductForm() {
  const productFromLs = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("product")) {
      return JSON.parse(localStorage.getItem("product") || "");
    } else {
      return false;
    }
  };

  const [values, setValues] = useState({
    error: "",
    success: "",
    title: "",
    slug: "",
    short_description: "",
    description: productFromLs(),
    price: 0,
    old_price: 0,
    category: "",
    code: 0,
    hidden: "",
    images: {},
  });
  // const [product, setProduct] = useState(productFromLs());

  const { error, success, title, description } = values;

  useEffect(() => {
    // setValues({ ...values });
  }, []);

  const publishProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(values);
  };

  const handleChange =
    (name: String) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ): void => {
      const value = event.target.value;
      setValues({ ...values, [String(name)]: value, error: "" });
    };

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files;

    setValues({ ...values, images: { ...value }, error: "" });
  };

  const handleBody = (event: String): void => {
    setValues({ ...values, description: event });
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(event));
    }
  };

  return (
    <>
      <form
        className="flex relative flex-wrap md:flex-nowrap "
        encType="multipart/form-data"
      >
        {false && <Loader />}
        <div className="w-full lg:w-3/5">
          <InputFieldAdm
            required={true}
            type="text"
            name="name"
            label="Nadpis produktu"
            prompt="Nadpis produktu"
            // error={err?.name}
            // value={formValues.name}
            handleChange={handleChange("title")}
          />
          <InputFieldAdm
            required={true}
            type="text"
            name="slug"
            label="URL adresa"
            prompt="slug"
            // error={err?.name}
            value={slugify(title)}
            handleChange={handleChange("slug")}
          />

          <div className="mt-4">
            <label htmlFor="price" className="mr-3">
              Cena:
            </label>
            <input
              type="number"
              className="w-20 mr-1 p-3 bg-gray-100"
              id="price"
              placeholder="Cena"
              required
              onChange={handleChange("price")}
            />
            Kč
            <label htmlFor="old_price" className="mx-3">
              Před:
            </label>
            <input
              type="number"
              className="w-20 p-3 mr-1 bg-gray-100 inline-block"
              id="old_price"
              placeholder="Cena"
              onChange={handleChange("old_price")}
            />
            Kč
          </div>
          {/* popis */}
          <InputFieldAdm
            required={true}
            type="textarea"
            name="short_description"
            label="Krátký popis"
            prompt="Krátký popis..."
            rows={5}
            // error={err?.name}
            // value={slugify(title)}
            handleChange={handleChange("short_description")}
          />

          <div>
            <h4 className="mb-2 text-base font-semibold text-gray-700 xl:text-lg">
              Popis produktu
            </h4>
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              theme="snow"
              value={description}
              placeholder="Dlouhý popis produktu..."
              className="mt-4 bg-gray-100"
              onChange={handleBody}
            />
          </div>
        </div>

        <div className="w-96 h-full lg:ml-10 bg-white">
          <div className="mt-4 ml-4">
            <label htmlFor="category">Kategorie:</label>
            <select
              id="category"
              className="ml-2 w-56 p-3 bg-gray-100"
              defaultValue="akcni"
              onChange={handleChange("category")}
            >
              <option value="akcni">Akční</option>
              <option value="dobrodruzne">Dobrodružné</option>
              <option value="rpg">RPG</option>
              <option value="strategie">Strategie</option>
            </select>
            <div className="mt-4">
              <label htmlFor="code" className="mr-3">
                Kod produktu:
              </label>
              <input
                type="number"
                className="w-32 p-3 bg-gray-100"
                id="code"
                placeholder="Kod"
                required
                onChange={handleChange("code")}
              />
            </div>
            <InputCheckBox
              name="hidden"
              label="Zobrazení produktu"
              // checked={formValues.hidden}
              onChange={handleChange("hidden")}
            />

            <MultipleFileInputField
              // img={formValues.image}
              required={true}
              label="Fotky produktu"
              multiple={true}
              handleChange={handleChangeImage}
            />
          </div>
        </div>
      </form>
      <div className="flex mt-7 mx-auto justify-center">
        <button
          onClick={publishProduct}
          className="py-1 px-2 bg-green-500 rounded-md"
        >
          Přidat produkt
        </button>
      </div>
    </>
  );
}

export default ProductForm;
