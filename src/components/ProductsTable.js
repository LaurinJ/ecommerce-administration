import React from "react";

function ProductsTable({ products }) {
  console.log(products);
  return (
    <table className="w-full table-fixed border-collapse border-gray-500 border-2">
      <thead>
        <tr className="border-b-2 border-gray-400">
          <th className="w-2/5 py-2">Jmeno</th>
          <th className="w-1/5 py-2">Cena</th>
          <th className="w-1/5 py-2">Skladem</th>
          <th className="w-1/5 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {products.getProducts.map((product) => (
          <tr className="border-b border-gray-400" key={product._id}>
            <td className="pl-3  py-2">{product.title}</td>
            <td className="text-center px-10 py-2">{product.price}</td>
            <td className="text-center px-10 py-2">{product.countInStock}</td>
            <td className="text-center px-10 py-2">
              <i className="fa fa-pencil fa-lg w-8 hover:text-gray-400" aria-hidden="true"></i>
              <i className="fa fa-trash fa-lg w-8 hover:text-gray-400" aria-hidden="true"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;
