import { IProduct } from "../dummy-products";
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

interface IProductDetail {
  item: IProduct;
}

const Product: React.FC<IProductDetail> = ({ item }) => {
  const { addItemToCart } = useContext(CartContext);
  return (
    <article className="product">
      <img src={item.image} alt={item.title} />
      <div className="product-content">
        <div>
          <h3>{item.title}</h3>
          <p className="product-price">${item.price}</p>
          <p>{item.description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addItemToCart(item.id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
};

export default Product;
