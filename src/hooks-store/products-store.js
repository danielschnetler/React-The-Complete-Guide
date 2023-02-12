import { initStore } from "./store";

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

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (currentState, productId) => {
      const index = currentState.products.findIndex(
        (prod) => prod.id === productId
      );
      const newList = [...currentState.products];
      const newFavState = !newList[index].isFavorite;
      newList[index] = {
        ...newList[index],
        isFavorite: newFavState,
      };
      return { products: newList };
    },
  };
  initStore(actions, { products: defaultProductList });
};

export default configureStore;
