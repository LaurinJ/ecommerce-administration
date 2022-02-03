import { orderCart } from "../apollo-client";

export const deleteItem = (id: string) => {
  const items = orderCart();
  const cart = items.filter((item) => item._id !== id);
  orderCart(cart);
};

export const countItem = (id: string, count: number) => {
  if (count <= 0) {
    deleteItem(id);
  } else {
    const items = orderCart();
    const cart = items.map((item) => {
      if (item._id === id) {
        return { ...item, count: count };
      } else {
        return item;
      }
    });
    orderCart(cart);
  }
};

export const getTotalPrice = () => {
  const items = orderCart();
  const total = Object.values(items).reduce(
    (t, { price, count }) => t + count * price,
    0
  );

  return total;
};

export const removeCart = () => {
  orderCart([]);
};
