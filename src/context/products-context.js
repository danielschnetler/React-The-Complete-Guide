import React, { useState } from "react";

const defaultProductList = [
  {
    id: "p1",
    title: "Red Scarf",
    description: "A pretty red scarf.",
    isFavorite: false,
  },
  {
    id: "p2",
    title: "Blue T-Shirt",
    description: "A pretty blue t-shirt.",
    isFavorite: false,
  },
  {
    id: "p3",
    title: "Green Trousers",
    description: "A pair of lightly green trousers.",
    isFavorite: false,
  },
  {
    id: "p4",
    title: "Orange Hat",
    description: "Street style! An orange hat.",
    isFavorite: false,
  },
];

export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {},
});

const ProductsProvider = (props) => {
  const [productsList, setProductsList] = useState(defaultProductList);

  const toggleFavorite = (productId) => {
    setProductsList((currentList) => {
      const newList = [...currentList];
      const index = currentList.findIndex((prod) => prod.id === productId);
      const newFavState = !newList[index].isFavorite;
      newList[index] = {
        ...newList[index],
        isFavorite: newFavState,
      };
      return newList;
    });
  };

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFav: toggleFavorite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
export default ProductsProvider;
