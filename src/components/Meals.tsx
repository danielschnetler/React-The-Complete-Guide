import { useContext } from "react";
import Meal from "./Meal";
import React from "react";
import { CartContext } from "../store/shopping-cart-context";

const Meals: React.FC = () => {
  const { meals: fetchedData } = useContext(CartContext);
  return (
    <ul id="meals">
      {fetchedData &&
        fetchedData.map((meal, index) => (
          <Meal
            key={index}
            id={meal.id}
            image={meal.image}
            name={meal.name}
            price={meal.price}
            description={meal.description}
          />
        ))}
    </ul>
  );
};

export default Meals;
