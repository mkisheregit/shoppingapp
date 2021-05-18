
import React, { useState } from "react";
function Cart({cartitems,removefromcart,increaseitems,decreaseitems})
 {
  
  return (
    <>
     {cartitems.map((product,index) =>
        (<div className="cart-item">
        <img src={product.image} alt="T-shirt_image" />
        <h1>{product.name}</h1>
        <p> Price : <strong>{product.price*product.quantity} &#8377;</strong></p>
        <span className="inc-dec">
          Items : <strong> {product.quantity} </strong>
          <div>
            <button type= "submit" onClick={()=>{decreaseitems(product,index)}}> - </button>
            <button type= "submit" onClick={()=>{increaseitems(product,index)}}> + </button>
          </div>
        </span>
        <button
          type="submit"
          onClick={() => {
            removefromcart(index);
          }}
        >
          remove
        </button>
      </div>
     ))
     }
  </>
  );
}
export default Cart;
