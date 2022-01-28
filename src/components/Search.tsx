import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/Query";

function Search({ searchFunc, page }: any) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { data } = useQuery(GET_CATEGORIES);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "category") {
      setCategory(value);
      searchFunc({
        variables: {
          params: { title: search.trim(), category: value },
        },
      });
    } else {
      setSearch(value);
      if (value.length > 2) {
        searchFunc({
          variables: {
            params: { title: value.trim(), category: category },
          },
        });
      }
    }
  };

  return (
    <form className="relative">
      <input
        type="search"
        className="p-4 rounded-sm lg:text-lg max-h-12 bg-gray-100 w-96 outline-none border border-gray-400"
        placeholder="Vyhledat podle čísla"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
}

export default Search;
