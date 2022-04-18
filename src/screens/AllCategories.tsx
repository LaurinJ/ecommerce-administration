import React from "react";
import { useQuery } from "@apollo/client";
import { CategoryTable } from "../components/table/CategoryTable";
import { Link } from "react-router-dom";
import { GET_CATEGORIES } from "../queries/Query";
import Loader from "../components/Loader";

function AllCategories() {
  const { loading, data } = useQuery(GET_CATEGORIES, {
    fetchPolicy: "network-only",
  });
  return (
    <div className="relative h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Kategorie</h1>
        <Link to="/add-category">
          <span className="p-2 bg-blue-300 rounded-sm">Přidat kategorii</span>
        </Link>
      </div>
      <div className="mt-5">
        {data ? (
          <CategoryTable categories={data.getAllCategories.categories} />
        ) : (
          "Nejsou k dispozici žádné kategorie"
        )}
      </div>
    </div>
  );
}

export default AllCategories;
