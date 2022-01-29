import React from "react";

type Product = {
  _id?: string;
  title: string;
  short_description: string;
  price: number;
  old_price: number;
  count: number;
  img: string;
};

interface Props {
  product: Product;
}

function CartItem({ product }: Props) {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {/* image section */}
        <div className="w-20 relative sm:w-[7.5rem] sm:h-[5.6rem] mr-5 mb-5 h-auto">
          <img
            src={`http://localhost:4000/${product.img}`}
            alt={product.title}
            width={140}
            height={185}
          />
        </div>
        {/* description section */}
        <div className="cartitem_product_info mb-5">
          <h4 className="mb-2 sm:text-lg font-semibold">{product.title}</h4>
          <div className="my-4 text-sm sm:text-base text-gray-600">
            <span>{product.short_description}</span>
          </div>
        </div>
        {/* price and amount section */}
        <div className="flex ml-auto text-[0.625rem] sm:text-xs font-medium text-gray-800 text-right">
          <div className="mr-5 lg:w-[6.25rem]">
            Kusů{" "}
            <div className="flex flex-col my-[10px]">
              <div>
                <span className="sm:text-lg font-bold">{product.count}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-[6.25rem]">
            Cena/Ks{" "}
            <div className="flex flex-col my-[10px]">
              <div className="text-sm text-red-500">
                <del>
                  {product.price < product.old_price
                    ? product.old_price + " Kč"
                    : ""}
                </del>
              </div>
              <div>
                <span className="sm:text-lg font-bold">{product.price} Kč</span>
              </div>
            </div>
          </div>
          <div className="ml-5 lg:w-[6.25rem]">
            Celkem{" "}
            <div className="flex flex-col my-[10px]">
              <div>
                <span className="sm:text-lg font-bold">
                  {product.price * product.count} Kč
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-8 pb-8 text-gray-300" />
    </>
  );
}

export default CartItem;
