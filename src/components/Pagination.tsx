import React from "react";

interface Props {
  page: number;
  pages: number;
  handleClick: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ page = 1, pages, handleClick }) => {
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
          <button
            key={i}
            onClick={() => {
              handleClick(i);
            }}
            className="w-[35px] mr-2 leading-8 text-center border inline-block border-gray-300 hover:border-black hover:bg-red-700 duration-200 cursor-pointer"
          >
            {i}
          </button>
        );
      }
    }
    return pagesButton;
  };

  return (
    <div className="my-7 flex justify-center font-bold sm:font-normal">
      {page > 1 ? (
        <button
          key="40"
          onClick={() => {
            handleClick(page - 1);
          }}
          className="w-[35px] mr-2 leading-8 text-center border inline-block border-gray-300 hover:border-black duration-200 bg-red-700 cursor-pointer"
        >
          &#60;
        </button>
      ) : (
        ""
      )}
      {paginator(page, pages)}
      {page < pages ? (
        <button
          key="41"
          onClick={() => {
            handleClick(page + 1);
          }}
          className="w-[35px] mr-2 leading-8 text-center border inline-block border-gray-300 hover:border-black duration-200 bg-red-700 cursor-pointer"
        >
          &#62;
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
