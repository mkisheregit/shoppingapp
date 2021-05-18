import React, { useState } from "react";
import Cart from "./Cart";
import Card from "./Card";
import Data from "./Data";

import Badge from "@material-ui/core/Badge"; 
/* for badge shoppingcarticon */
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function App() {
  const [cartitems, setCartItems] = useState([]);    /* cartitems will store items of cart*/
  const [page, setPage] = useState("products");      /* for setting the page between items and cart*/
   
  function removefromcart(id)           /*will remove clicked item  with  given id from cart */
  {
   setCartItems((prevcartitems)=>{        /*prevcartitems is always an array if cartitems is array */
    return prevcartitems.filter((product,index) => {
       return index !== id;
     });
   } );
   
 }
  const addtocart = (a)=> {
   let newcart = [...cartitems];           {/* created new cart for further evalu.. */}
   let selecteditem = newcart.find((item)=> {return item.name === a.name});  {/* selected item will be single object/element or empty  */}
   if(selecteditem){         {/*if it is not empty then we will increase its quantity since it  is dupliccate */}
     selecteditem.quantity++;
   }
   else{                    {/* since item is not duplicate we will add item to cart after giving element a extra entry '' */}
    selecteditem={...a,
    quantity:1} ;
    newcart =[...newcart,{...selecteditem}];
   }
  
    setCartItems(newcart);  
  }
 function deleteall(){    {/*will delete all cart items by making caritems an empty araay */}
   setCartItems((previtems)=>{ 
     return [];
   });
 }
   const increaseitems =(product,index)=>{   /* item in cart have functionality to increase item no */
     const newcart = [...cartitems];       /*created new aray for further evaluation */
     newcart.find((item)=>item.name === product.name).quantity++;  /* increased quanity of item after clicking its + button */
     setCartItems([...newcart]);
   }

 const decreaseitems =(product,index)=>{
  const newcart = [...cartitems];
   const k = newcart.find((item)=>item.name === product.name).quantity--;  /* decreased quanity of item after clicking its - button */
    if(k<2)  /* quanity of selected item will go 0 or - ,to avoid to make it one  */
    newcart.find((item)=>item.name === product.name).quantity=1;
  setCartItems([...newcart]);
   }


 let totalitems = 0; {/* total items in cart */}
 totalitems= cartitems.reduce((sum,{quantity})=> sum+quantity,0); /* calculated totel items here by reduce function */
 
  const totalcost= cartitems.reduce((sum,{quantity,price})=>sum+quantity*price, 0);  /* calculated totel  here by reduce function */
 
  const date = new Date();
  const StyledBadge = withStyles((theme) => ({  /*for styling shoppingcarticon and itsbadge */
    badge: {
      right: -4,
      top: 4,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: "7px",
      color: "black",
      fontSize: "25px",
      backgroundColor:"pink"
      
    }
  }))(Badge);
  

  return (
    <div className="container">
     
        <header>Book your t-shirt</header>

        <div className="head">
        <button type="button" onClick={()=> setPage("products")}
         style={{ backgroundColor:(page === "products")?'white':null, 
        color:(page === "products")?'black':null}}  >
          See items
        </button>

        <button type="button" onClick={()=> setPage("viewcart")} 
        style={(page === "viewcart")?{backgroundColor:'white', color:'black'}:null}> {/* we can do it both ways*/}      
          <IconButton aria-label="cart" style={{backgroundColor:"white"}}>
      <StyledBadge badgeContent={totalitems} color="secondary">
        <ShoppingCartIcon style={{ color: "black", fontSize: "25px" }} />
      </StyledBadge>
    </IconButton>
        </button>

        </div>

      { page === "products" && (
          <div className="items">
            {Data.map((a, index) => (   /* make items list  */
              
              <Card
                key={index}
                id={index}
                image={a.image}
                price={a.price}
                name={a.name}
                onClick={() => addtocart(a)}  /*by clicking items item will go to cart */
              />
      ))}
          </div>
        )}
      { page === "viewcart" && (
        <div className="items">
          <Cart
          removefromcart={removefromcart}  /*passing func*/
          cartitems={cartitems}
          decreaseitems={decreaseitems}
          increaseitems={increaseitems}
          /> 
        
          <p className="notification" style={(totalitems==0)?{display:"block"}:{display:"none"}}>oops! cart is empty</p> {/*notification will be shown if cart is empty */}
          
          <div style={(totalitems== 0)?{display:"none"}:{display:"block"}}>  {/* if cart is empty the no meaning to show totel items and total aamoutn */}
          <p className="totalcost" style={(totalitems== 0)?{display:"none"}:{display:"block"}} >total amount : &#8377; <b>{totalcost}</b></p>
          <button onClick={deleteall} className="delete-all-btn"
       style={(totalitems== 0)?{display:"none"}:{display:"block"}}>remove all</button> 
       </div>
        </div>
      )}

      <footer>copyright &#169; {date.getFullYear()}</footer>
    </div>
  );
}
export default App;
