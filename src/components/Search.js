import React, { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/Query";
import SearchSelectField from "./form/SearchSelectField";

function Search({ searchFunc }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const { data } = useQuery(GET_CATEGORIES);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 2) {
      searchFunc({ variables: { params: { title: value.trim() } } });
    }
  };

  useEffect(() => {}, []);

  return (
    <form className="hidden relative lg:flex">
      <input
        type="search"
        className="p-4 rounded-l-sm lg:text-lg max-h-12 bg-gray-100 w-96 outline-none border-r-0 border border-gray-400"
        placeholder="Vyhledat..."
        value={search}
        onChange={handleChange}
      />
      <SearchSelectField
        name="categories"
        prompt="Vyber kategorii"
        // value={formValues.categories}
        data={data?.getCategories}
        // handleChange={handleChangeSelect}
      />
    </form>
  );
}

export default Search;
