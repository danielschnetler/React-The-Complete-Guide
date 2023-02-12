import React from "react";
import { useStore } from "../../hooks-store/store";
import Card from "../UI/Card";
import "./ProductItem.css";

const ProductItem = React.memo((props) => {
  const dispatch = useStore(false)[1];
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={dispatch.bind(null, "TOGGLE_FAV", props.id)}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
