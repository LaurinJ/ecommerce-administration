import React from "react";
import { Link } from "react-router-dom";

interface Props {
  products: any;
}

export const ProductsTable: React.FC<Props> = ({ products }) => {
  return (
    <table className="w-full table-fixed border-collapse border-gray-200 border">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-lg w-2/5 py-3">Jmeno</th>
          <th className="text-lg w-1/5 py-3">Cena</th>
          <th className="text-lg w-1/5 py-3">Skladem</th>
          <th className="text-lg w-1/5 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any, i: KeyType) => (
          <tr
            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
            key={i}
          >
            <td className=" pl-3  py-3">{product.title}</td>
            <td className="text-center px-10 py-3">{product.price}</td>
            <td className=" text-center px-10 py-3">{product.countInStock}</td>
            <td className=" text-center px-10 py-3">
              <Link to={`/edit-product/${product.slug}`}>
                <i
                  className="fa fa-pencil fa-lg w-8 hover:text-gray-400 cursor-pointer"
                  aria-hidden="true"
                ></i>
              </Link>
              <i
                className="fa fa-trash fa-lg w-8 hover:text-gray-400 cursor-pointer"
                aria-hidden="true"
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
