import React from "react";
function Card(props) {
  return (
    <div className="item">
      <img src={props.image} alt="T-shirt_image" />
      <h1>{props.name}</h1>
      <p>{props.price} &#8377;</p>
      <button
        type="submit"
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
export default Card;
