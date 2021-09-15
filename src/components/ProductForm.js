import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../helpers/quill";
import slugify from "slugify";

function ProductForm() {
  const productFromLs = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("product")) {
      return JSON.parse(localStorage.getItem("product"));
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
    images: "",
  });
  // const [product, setProduct] = useState(productFromLs());

  const { error, success, title, description } = values;

  useEffect(() => {
    // setValues({ ...values });
  }, []);

  const publishProduct = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleChange = (name) => (e) => {
    const value = name === "images" ? e.target.files[0] : e.target.value;
    setValues({ ...values, [name]: value, error: "" });
  };

  const handleBody = (e) => {
    setValues({ ...values, description: e });
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  return (
    <form
      className="flex justify-between flex-wrap"
      encType="multipart/form-data"
      onSubmit={publishProduct}
    >
      <div className="w-3/5">
        <div className="">
          <input
            type="text"
            className="w-full p-3 bg-gray-100"
            placeholder="Nadpis produktu"
            required
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="w-full p-3 bg-gray-100"
            placeholder="URL adresa"
            required
            value={slugify(title)}
            onChange={handleChange("slug")}
          />
        </div>
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
            className="w-20 p-3 mr-1 bg-gray-100"
            id="old_price"
            placeholder="Cena"
            onChange={handleChange("old_price")}
          />
          Kč
        </div>
        {/* popis */}
        <div className="mt-4">
          <textarea
            rows="2"
            cols="50"
            name="sm-popis"
            className="w-full p-3 bg-gray-100"
            placeholder="Krátký popis..."
            required
            onChange={handleChange("short_description")}
          />
        </div>
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

      <div className="w-96 h-80 bg-white">
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
          <div className="mt-4 ">
            <label className="mr-3" htmlFor="hidden">
              Zobrazit:
            </label>
            <input
              className="w-5 h-5 bg-green-400 text-black"
              type="checkbox"
              id="hidden"
              onChange={handleChange("hidden")}
            />
          </div>
          <div className="mt-4">
            <h5>Obrazky</h5>
            <hr />

            <small>Max velikost obrázku: 1mb</small>
            <br />
            <label className="inline-block mt-2 py-1 px-2 bg-green-500 rounded-md">
              Nahrát obrázky
              <input type="file" multiple accept="image/" hidden />
            </label>
          </div>
        </div>
      </div>

      <div className="flex mt-7 mx-auto">
        <button type="submit" className="py-1 px-2 bg-green-500 rounded-md">
          Přidat produkt
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
