import { useEffect, useState } from "react";
import Meal from "./Meal";

const Meals: React.FC = () => {
  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/meals");
      const data = await response.json();
      setFetchedData(data);
    };
    getData();
  }, []);
  console.log(fetchedData);
  return (
    <div id="meals">
      {fetchedData &&
        fetchedData.map((meal) => (
          <Meal
            id={meal.id}
            image={meal.image}
            name={meal.name}
            price={meal.price}
            description={meal.description}
          />
        ))}
    </div>
  );
};

export default Meals;
