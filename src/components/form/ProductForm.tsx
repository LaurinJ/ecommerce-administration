import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../helpers/quill";
// import { QuillModules, QuillFormats } from "../../helpers/quill";
import { useLazyQuery, useMutation, ApolloError } from "@apollo/client";
import { GET_CATEGORIES, GET_PRODUCT, SEARCH } from "../../queries/Query";
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
import { getLocalStorage, setLocalStorage } from "../../actions/auth";

import { Product, ProductErrors } from "../../type/product";
import { Category } from "../../type/category";

interface Props {
  slug: string;
}

function ProductForm({ slug }: Props) {
  const productFromLs = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (getLocalStorage("description")) {
      return getLocalStorage("description");
    } else {
      return false;
    }
  };

  const initialState = {
    _id: "",
    title: "",
    slug: "",
    short_description: "",
    price: 0,
    old_price: 0,
    categories: [],
    code: "",
    countInStock: 0,
    hidden: false,
    images: [],
  };

  const [formValues, setFormValues] = useState<Product>(initialState);
  const [description, setDescription] = useState("");
  const [err, setErr] = useState<ProductErrors>({});

  const [getCategory, { data: categories, loading: categoriesLoading }] =
    useLazyQuery(GET_CATEGORIES, { notifyOnNetworkStatusChange: true });

  const [getProduct, { loading: productLoading }] = useLazyQuery(GET_PRODUCT, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const product = data.getProduct;
      const state = {
        _id: product._id,
        title: product.title,
        slug: product.slug,
        short_description: product.short_description,
        price: product.price,
        old_price: product.old_price,
        categories: product.categories.map((cat: Category) => cat._id),
        code: product.code,
        countInStock: product.countInStock,
        hidden: product?.hidden || false,
        images: product.images,
      };

      setFormValues(state);
      setDescription(product.description);
      setLocalStorage("description", product.description);
    },
  });

  const Mutation = slug ? EDIT_PRODUCT : CREATE_PRODUCT;
  const [createProduct, { loading: loadingMutation }] = useMutation(Mutation, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [SEARCH],
    onCompleted: () => {
      setLocalStorage("description", "");
      setErr({});
      setFormValues(initialState);
      setDescription("");
    },
  });

  useEffect(() => {
    getCategory();
    setDescription(productFromLs());
    if (slug) {
      getProduct({ variables: { slug: slug } });
    }
  }, [getCategory, getProduct, slug]);

  const publishProduct = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const errors = validate(formValues);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        await createProduct({
          variables: {
            product: {
              _id: formValues._id,
              title: formValues.title,
              hidden: formValues.hidden,
              categories: [...formValues.categories],
              countInStock: Number(formValues.countInStock),
              price: Number(formValues.price),
              old_price: Number(formValues.old_price),
              code: formValues.code,
              short_description: formValues.short_description,
              description: description,
            },
            images: formValues.images,
          },
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        setErr(error.graphQLErrors[0].extensions.errors);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
    if (value && value[0]) {
      let i = Array.from(value);
      setFormValues({ ...formValues, images: i });
    }
  };

  const handleBody = (e: any): void => {
    setDescription(e);

    if (typeof window !== "undefined") {
      setLocalStorage("description", e);
    }
  };

  return (
    <>
      <form
        className="flex relative flex-wrap md:flex-nowrap "
        encType="multipart/form-data"
      >
        {(categoriesLoading || productLoading || loadingMutation) && <Loader />}
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
            <EditorToolbar toolbarId={"t1"} />
            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleBody}
              placeholder={"Write something awesome..."}
              modules={modules("t1")}
              formats={formats}
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
              data={categories?.getAllCategories.categories}
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
        <button onClick={publishProduct} className="btn">
          {slug ? "Aktualizovat produkt" : "Přidat produkt"}
        </button>
      </div>
    </>
  );
}

export default ProductForm;
