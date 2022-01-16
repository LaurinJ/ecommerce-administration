import React from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "../components/form/CategoryForm";

type CategoryId = {
  id: string;
};

function AddCategory() {
  const { id } = useParams<CategoryId>();

  return (
    <React.Fragment>
      <h1 className="text-2xl">Nová ketegorie</h1>
      <div className="mt-5">
        <CategoryForm id={id} />
      </div>
    </React.Fragment>
  );
}

export default AddCategory;
