import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/Query";
import SearchSelectField from "./form/SearchSelectField";

interface Props {
  searchFunc: (options: any) => {};
}

function Search({ searchFunc }: Props) {
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
          limit: 10,
          params: { title: search.trim(), category: value },
        },
      });
    } else {
      setSearch(value);
      if (value.length > 2) {
        searchFunc({
          variables: {
            limit: 10,
            params: { title: value.trim(), category: category },
          },
        });
      } else {
        if (value.length === 0) {
          searchFunc({
            variables: {
              limit: 10,
              params: { title: "", category: "" },
            },
          });
        }
      }
    }
  };

  return (
    <form className="relative flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        className="p-4 rounded-l-sm lg:text-lg max-h-12 bg-gray-100 w-96 outline-none border-r-0 border border-gray-400"
        placeholder="Vyhledat..."
        value={search}
        onChange={handleChange}
      />
      <SearchSelectField
        name="category"
        prompt="Vyber kategorii"
        value={category}
        data={data?.getAllCategories.categories}
        handleChange={handleChange}
        emptySelected=""
      />
    </form>
  );
}

export default Search;
