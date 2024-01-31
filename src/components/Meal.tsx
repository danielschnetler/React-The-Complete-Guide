interface IMeal {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Meal: React.FC<IMeal> = ({ id, name, price, description, image }) => {
  return (
    <div className="meal-item">
      <img src={`http://localhost:3000/${image}`} alt={`Image of ${name}`} />
      <h3>{name}</h3>

      <p key={id} className="meal-item-price">
        {price}
      </p>
      <p className="meal-item-description">{description}</p>
      <div className="meal-item-actions">
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Meal;
