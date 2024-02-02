import useHttp from "../hooks/useHttp";
import Error from "./Error";
import Meal from "./Meal";
import React from "react";

const requestConfig = {};

const Meals: React.FC = () => {
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching meal data</p>;
  }
  if (error) {
    return (
      <Error
        title="An Error has occured!"
        message={error.message ?? "Failed to load the data from the server"}
      />
    );
  }

  return (
    <ul id="meals">
      {data &&
        data.map((meal, index) => (
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
