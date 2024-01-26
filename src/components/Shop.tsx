import { ReactNode } from "react";

interface IShop {
  children: ReactNode;
}

const Shop: React.FC<IShop> = ({ children }) => {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">{children}</ul>
    </section>
  );
};

export default Shop;
