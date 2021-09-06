import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../helpers/quill";

function ProductForm() {
  return (
    <form className="flex justify-between flex-wrap" enctype="multipart/form-data">
      <div className="w-3/5">
        <div class="">
          {/* <label for="inputEmail4" className="mr-2">
                Email
              </label>
              <hr />
              <br /> */}
          <input type="text" className="w-full p-3 bg-gray-100" placeholder="Nadpis produktu" />
        </div>

        <div class="mt-4">
          {/* <label for="inputAddress">Address</label> */}
          <input
            type="text"
            className="w-full p-3 bg-gray-100"
            id="inputAddress"
            placeholder="URL adresa"
          />
        </div>
        <div class="mt-4">
          <label for="inputAddress2" className="mr-3">
            Cena:
          </label>
          <input
            type="number"
            class="w-20 mr-1 p-3 bg-gray-100"
            id="inputAddress2"
            placeholder="Cena"
          />
          Kč
          <label for="inputAddress2" className="mx-3">
            Před:
          </label>
          <input
            type="number"
            class="w-20 p-3 mr-1 bg-gray-100"
            id="inputAddress2"
            placeholder="Cena"
          />
          Kč
        </div>
        {/* popis */}
        <div class="mt-4">
          {/* <label for="inputCity">City</label> */}
          <textarea
            rows="2"
            cols="50"
            name="sm-popis"
            class="w-full p-3 bg-gray-100"
            placeholder="Krátký popis..."
          />
        </div>
        <ReactQuill
          modules={QuillModules}
          formats={QuillFormats}
          theme="snow"
          value=""
          placeholder="Dlouhý popis produktu..."
          className="mt-4 bg-gray-100"
        />
      </div>

      <div className="w-96 h-80 bg-white">
        <div class="mt-4 ml-4">
          <label for="inputState">Kategorie:</label>
          <select id="inputState" class="ml-2 w-56 p-3 bg-gray-100">
            <option selected>Akční</option>
            <option>Dobrodružné</option>
            <option>RPG</option>
            <option>Strategie</option>
          </select>
          <div class="mt-4">
            <label for="inputAddress2" className="mr-3">
              Kod produktu:
            </label>
            <input
              type="number"
              class="w-32 p-3 bg-gray-100"
              id="inputAddress2"
              placeholder="Kod"
            />
          </div>
          <div class="mt-4 ">
            <label class="mr-3" for="gridCheck">
              Zobrazit:
            </label>
            <input class="w-5 h-5 bg-green-400 text-black" type="checkbox" id="gridCheck" />
          </div>
          <div className="mt-4">
            <h5>Obrazky</h5>
            <hr />

            <small>Max velikost obrázku: 1mb</small>
            <br />
            <label className="inline-block mt-2 py-1 px-2 bg-green-500">
              Nahrát obrázky
              <input type="file" multiple accept="image/" hidden />
            </label>
          </div>
        </div>
      </div>

      <div className="flex mt-7 mx-auto">
        <button type="submit" className="py-1 px-2 bg-green-500">
          Přidat produkt
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
