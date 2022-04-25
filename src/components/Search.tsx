import React, { useState } from "react";

interface Props {
  searchFunc: (options: any) => {};
  page: number;
}

function Search({ searchFunc, page }: Props) {
  const [search, setSearch] = useState<string>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSearch(value);
    if (value.length > 2) {
      searchFunc({
        variables: {
          skip: page,
          limit: 10,
          params: { numberOrder: value },
        },
      });
    }
  };

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="number"
        className="p-4 rounded-sm lg:text-lg max-h-12 bg-gray-100 w-96 outline-none border border-gray-400"
        placeholder="Vyhledat podle čísla"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
}

export default Search;
