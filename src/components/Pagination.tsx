import React from "react";
import { Link, useParams } from "react-router-dom";

interface Props {
  page: number;
  pages: number;
}

const Pagination: React.FC<Props> = ({ page = 1, pages }) => {
  const q = useParams();
  const paginator = (p: number, ps: number) => {
    const pagesButton = [];
    for (let i = 1; i <= ps; i++) {
      if (p === i) {
        pagesButton.push(
          <button
            key={i}
            className="w-[35px] mr-2 leading-8 text-center border inline-block border-gray-300 bg-red-700"
          >
            {i}
          </button>
        );
      } else {
        pagesButton.push(
          <Link to={`/products?page=${i}&q=${q}`} key={i}>
            <button
              key={i}
              className="w-[35px] mr-2 leading-8 text-center border inline-block border-gray-300 hover:border-black hover:bg-red-700 duration-200 cursor-pointer"
            >
              {i}
            </button>
          </Link>
        );
      }
    }
    return pagesButton;
  };

  return (
    <div className="my-7 flex justify-center font-bold sm:font-normal">
      {page > 1 ? (
        <Link to={`/products?page=${page - 1}&q=${q}`} key="40">
          <button
            key="40"
            className="w-[35px] mr-2 leading-8 text-center border inline-block border-gray-300 hover:border-black duration-200 bg-red-700 cursor-pointer"
          >
            &#60;
          </button>
        </Link>
      ) : (
        ""
      )}
      {paginator(page, pages)}
      {page < pages ? (
        <Link to={`/products?page=${page + 1}&q=${q}`} key="41">
          <button
            key="41"
            className="w-[35px] mr-2 leading-8 text-center border inline-block border-gray-300 hover:border-black duration-200 bg-red-700 cursor-pointer"
          >
            &#62;
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
