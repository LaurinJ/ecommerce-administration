import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
// import { Delta as TypeDelta } from "quill";
// import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../queries/Query";
import slugify from "slugify";
import Loader from "../Loader";
import InputFieldAdm from "./InputFieldAdm";
import InputCheckBox from "./InputCheckBox";
import FileInputField from "./FileInputField";
import { validate } from "../../validators/product";
import InputNumberField from "./InputNumberField";
import InputPriceField from "./InputPriceField";
import InputSelectField from "./InputSelectField";

export interface Errors {
  title?: string;
  price?: string;
  image?: string;
  code?: string;
  short_description?: string;
  description?: string;
}

export interface State {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  old_price: number;
  category: string;
  code: number;
  hidden: boolean;
  images: object;
}

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

  const [formValues, setFormValues] = useState<State>({
    title: "",
    slug: "",
    short_description: "",
    description: productFromLs(),
    price: 0,
    old_price: 0,
    category: "",
    code: 0,
    hidden: false,
    images: {},
  });
  const [err, setErr] = useState<Errors>({});
  const { data, loading } = useQuery(GET_CATEGORIES);
  console.log(formValues);

  useEffect(() => {
    // setFormValues({ ...formValues });
  }, []);

  const publishProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    if (name === "hidden") {
      setFormValues({
        ...formValues,
        [String(name)]: event.target.value,
      });
    } else {
      setFormValues({ ...formValues, [String(name)]: value });
    }
  };

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files;

    setFormValues({ ...formValues, images: { ...value } });
  };

  const handleBody = (event: string): void => {
    setFormValues({ ...formValues, description: event });
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
        {loading && <Loader />}
        <div className="w-full lg:w-3/5">
          <InputFieldAdm
            required={true}
            type="text"
            name="title"
            label="Nadpis produktu"
            prompt="Nadpis produktu"
            error={err?.title}
            value={formValues.title}
            handleChange={handleChange}
          />
          <InputFieldAdm
            required={true}
            type="text"
            name="slug"
            label="URL adresa"
            prompt="slug"
            value={slugify(formValues.title)}
          />
          {/* price section */}
          <div className="flex ">
            {/* price field */}
            <InputPriceField
              required={true}
              name="price"
              label="Aktuální cena"
              prompt="Cena..."
              // error={"Toto pole je povine"}
              error={err?.price}
              value={formValues.price}
              handleChange={handleChange}
            />
            {/* old price field */}
            <InputPriceField
              required={true}
              name="old_price"
              label="Stará cena"
              prompt="Stará cena..."
              value={formValues.old_price}
              handleChange={handleChange}
            />
          </div>

          {/* popis */}
          <InputFieldAdm
            required={true}
            type="textarea"
            name="short_description"
            label="Krátký popis"
            prompt="Krátký popis..."
            rows={5}
            error={err?.short_description}
            value={formValues.short_description}
            handleChange={handleChange}
          />

          <div>
            <h4 className="mb-2 text-base font-semibold text-gray-700 xl:text-lg">
              Popis produktu
            </h4>
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              theme="snow"
              value={formValues.description}
              placeholder="Dlouhý popis produktu..."
              className="mt-4 bg-gray-100"
              onChange={handleBody}
            />
          </div>
        </div>

        <div className="w-96 h-full lg:ml-10 bg-white">
          <div className="mt-4 ml-4">
            <InputSelectField
              required={true}
              name="category"
              label="Kategorie"
              // error={"Toto pole je povine"}
              value={formValues.category}
              data={data}
              handleChange={handleChange}
            />
            {/* <label htmlFor="category">Kategorie:</label>
            <select
              name="category"
              className="ml-2 w-56 p-3 mb-4 bg-gray-100"
              onChange={handleChange}
            >
              {data &&
                data.getCategories.map((category: any, i: KeyType) => {
                  return (
                    <option
                      className="p-2 bg-gray-500"
                      value={category._id}
                      key={i}
                    >
                      {category.name}
                    </option>
                  );
                })}
            </select> */}
            <InputNumberField
              required={true}
              type="number"
              name="code"
              label="Kod"
              prompt="Kod..."
              error={err?.code}
              value={formValues.code}
              handleChange={handleChange}
            />
            <InputCheckBox
              name="hidden"
              label="Zobrazení produktu"
              checked={formValues.hidden}
              value={formValues.hidden}
              // checked={formValues.hidden}
              onChange={handleChange}
            />

            <FileInputField
              img={formValues.images}
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
