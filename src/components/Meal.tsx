import React, { useContext } from "react";
import { CartContext, IMeal } from "../store/shopping-cart-context";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./UI/Button";

const Meal: React.FC<IMeal> = ({ id, name, price, description, image }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <li className="meal-item" key={id}>
      <article>
        <img src={`http://localhost:3000/${image}`} alt={`Image of ${name}`} />
        <div>
          <h3>{name}</h3>
          <p key={`${id}${price}`} className="meal-item-price">
            {currencyFormatter.format(price)}
          </p>
          <p key={`${id}${name}`} className="meal-item-description">
            {description}
          </p>
        </div>

        <p key={`${id}button`} className="meal-item-actions">
          <Button className="button" onClick={() => addItemToCart(id)}>
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
};

export default Meal;
