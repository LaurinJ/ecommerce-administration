import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../DeleteButton";

type Category = {
  _id: string;
  name: string;
  image: string;
  price: number;
  hidden: boolean;
};

interface Props {
  categories: [Category];
}

export const CategoryTable: React.FC<Props> = ({ categories }) => {
  const handleDelete = () => {
    console.log("delete: ");
  };

  return (
    <table className="w-full table-fixed border-collapse border-gray-200 border">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-lg w-2/5 py-3">Jmeno</th>
          <th className="text-lg w-1/5 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, i) => (
          <tr
            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
            key={i}
          >
            <td className=" py-3 text-center">{category.name}</td>
            <td className=" py-3 ">
              {category.hidden ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </td>
            <td className="text-center px-10 py-3">
              <Link to={`/edit-category/${category._id}`}>
                <i
                  className="fa fa-pencil fa-lg w-8 hover:text-gray-400 cursor-pointer"
                  aria-hidden="true"
                ></i>
              </Link>
              <DeleteButton id={category._id} handleDelete={handleDelete} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
