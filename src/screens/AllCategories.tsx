import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { CategoryTable } from "../components/table/CategoryTable";
import { Link } from "react-router-dom";
import { GET_CATEGORIES } from "../queries/Query";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

function AllCategories() {
  const [page, setPage] = useState<number>(1);
  const { loading, data } = useQuery(GET_CATEGORIES, {
    fetchPolicy: "network-only",
    variables: { skip: page },
  });

  const handleClick = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Kategorie</h1>
        <Link to="/add-category">
          <span className="btn">Přidat kategorii</span>
        </Link>
      </div>
      <div className="screen_container">
        {loading && <Loader />}
        {data ? (
          <CategoryTable categories={data.getAllCategories.categories} />
        ) : (
          "Nejsou k dispozici žádné kategorie"
        )}
      </div>
      {data?.getAllCategories.pages > 1 && (
        <Pagination
          page={page}
          pages={data.getAllCategories.pages}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default AllCategories;
