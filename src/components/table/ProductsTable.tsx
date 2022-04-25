import React from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationProvider";
import { Product } from "../../type/product";
import DeleteButton from "../DeleteButton";
import Loader from "../Loader";
import { DELETE_PRODUCT } from "../../queries/Mutation";
import { SEARCH } from "../../queries/Query";

interface Props {
  products: Product[];
}

export const ProductsTable: React.FC<Props> = ({ products }) => {
  const dispatch = useNotification();

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [SEARCH],
    onCompleted: () => {
      dispatch({
        type: "SUCCESS",
        message: "Produkt byl odstraněn!",
        title: "Successful Request",
      });
    },
  });

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
      <tbody className="relative">
        {loading && <Loader />}
        {products.map((product, i) => (
          <tr
            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
            key={i}
          >
            <td className=" pl-3  py-3" title={product.title}>
              {product.title.slice(0, 55)}
              {product.title.length > 55 ? "..." : ""}
            </td>
            <td className="text-center px-10 py-3">{product.price}</td>
            <td className=" text-center px-10 py-3">{product.countInStock}</td>
            <td className=" text-center px-10 py-3">
              <Link to={`/edit-product/${product.slug}`}>
                <i
                  className="fa fa-pencil fa-lg w-8 hover:text-gray-400 cursor-pointer"
                  aria-hidden="true"
                  title="Upravit"
                ></i>
              </Link>
              <DeleteButton id={product._id} handleDelete={deleteProduct} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
