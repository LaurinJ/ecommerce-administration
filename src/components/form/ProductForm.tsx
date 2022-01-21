import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
// import { Delta as TypeDelta } from "quill";
// import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { useQuery, useMutation, ApolloError } from "@apollo/client";
import { GET_CATEGORIES } from "../../queries/Query";
import { CREATE_PRODUCT, EDIT_PRODUCT } from "../../queries/Mutation";
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
  countInStock?: string;
  categories?: string;
}

export interface State {
  _id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  old_price: number;
  categories: string[];
  code: string;
  countInStock: number;
  hidden: boolean;
  images: any;
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

  const initialState = {
    _id: "",
    title: "",
    slug: "",
    short_description: "",
    description: productFromLs(),
    price: 0,
    old_price: 0,
    categories: [],
    code: "",
    countInStock: 0,
    hidden: false,
    images: [],
  };

  const [formValues, setFormValues] = useState<State>(initialState);
  const [err, setErr] = useState<Errors>({});
  const { data, loading } = useQuery(GET_CATEGORIES);
  console.log(formValues);
  const Mutation = false ? EDIT_PRODUCT : CREATE_PRODUCT;
  const [createProduct, { loading: loadingMutation }] = useMutation(Mutation, {
    onCompleted: (data) => {
      setFormValues(initialState);
    },
  });

  useEffect(() => {
    // setFormValues({ ...formValues });
  }, []);

  // console.log(formValues.categories);

  const publishProduct = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const errors = validate(formValues);
      setErr(errors);
      console.log(errors);
      if (Object.keys(errors).length === 0) {
        await createProduct({
          variables: {
            product: {
              // _id: formValues._id,
              title: formValues.title,
              hidden: formValues.hidden,
              categories: [...formValues.categories],
              countInStock: Number(formValues.countInStock),
              price: Number(formValues.price),
              old_price: Number(formValues.old_price),
              code: formValues.code,
              short_description: formValues.short_description,
              description: formValues.description,
            },
            images: formValues.images,
          },
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        console.log(error.graphQLErrors);

        setErr(error.graphQLErrors[0].extensions.errors);
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    // | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    if (name === "hidden") {
      setFormValues({
        ...formValues,
        [String(name)]: event.target.checked,
      });
    } else {
      setFormValues({ ...formValues, [String(name)]: value });
    }
  };

  const handleChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name } = event.target;
    if (["categories"].includes(name)) {
      let cat = Array.from(event.target.selectedOptions, (item) => item.value);
      setFormValues({ ...formValues, [String(name)]: cat });
    }
  };

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files;
    console.log(value);
    if (value && value[0]) {
      let i = Array.from(value);
      setFormValues({ ...formValues, images: i });
    }
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
        {(loading || loadingMutation) && <Loader />}
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
            handleChange={handleChange}
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
            {/* select category */}
            <InputSelectField
              required={true}
              name="categories"
              label="Kategorie"
              prompt="Vyber kategorie"
              multiple={true}
              error={err?.categories}
              value={formValues.categories}
              data={data}
              handleChange={handleChangeSelect}
            />
            <InputNumberField
              required={true}
              type="text"
              name="code"
              label="Kod produktu"
              prompt="Kod..."
              error={err?.code}
              value={formValues.code}
              handleChange={handleChange}
            />
            <InputNumberField
              required={true}
              type="number"
              name="countInStock"
              label="Kusu na skladě"
              prompt="Počet..."
              error={err?.countInStock}
              value={formValues.countInStock}
              handleChange={handleChange}
            />
            <InputCheckBox
              name="hidden"
              label="Zobrazení produktu"
              checked={formValues.hidden}
              // value={formValues.hidden}
              // checked={formValues.hidden}
              handleChange={handleChange}
            />

            <FileInputField
              img={formValues.images}
              required={true}
              label="Fotky produktu"
              multiple={true}
              error={err?.image}
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
