import { Button, Image } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../redux/cart/action";
import "./Cart.css";

export const Cart = () => {
   const items = useSelector((state) => state.cart.todos);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [totalPrice, setTotalPrice] = useState(0);

   const handleDelete = (id) => {
      dispatch(removeItem(id));
   };

   useEffect(() => {
      if (items) {
         let item_total_price = 0;
         for (let key = 0; key < items.length; key++) {
            item_total_price += Number(items[key].Price);
         }
         setTotalPrice(item_total_price);
      }
   }, [items]);

   if (items.length == 0) {
      return (
         <div className="emptycart">
            <div>
               <img
                  src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png"
                  alt=""
               />
            </div>
            <div>
               <button
                  onClick={() => {
                     navigate("/product");
                  }}
               >
                  Go Shopping
               </button>
            </div>
         </div>
      );
   }

   return (
      <>
         <div className="main">
            <div className="main1">
               {items.map((e) => {
                  return (
                     <div className="cartdiv">
                        <div>
                           <Image height={"100%"} src={e.Image} alt="" />
                        </div>
                        <div>
                           <h3>Dish :- {e.Name}</h3>
                           <p> price :- {e.Price / 100} ₹</p>
                           <Button
                              onClick={() => {
                                 {
                                    handleDelete(e.Id);
                                 }
                              }}
                           >
                              Remove
                           </Button>
                        </div>
                     </div>
                  );
               })}
            </div>
            <div className="main2">
               <h4>Cart Details</h4>
               <div>
                  {" "}
                  <p>Total Items in the cart :-</p>
                  <span>{items.length}</span>
               </div>
               <div>
                  <p>Total Items cost :-</p>
                  <span>{totalPrice / 100} ₹</span>
               </div>
               <div>
                  {" "}
                  <p>Discount :-</p>
                  <span>20%</span>
               </div>
               <div>
                  {" "}
                  <p>GST :-</p>
                  <span>18%</span>
               </div>
               <hr />
               <div>
                  {" "}
                  <p>Total Price :-</p>
                  <span>
                     {((totalPrice / 100) * (80 / 100) * (118 / 100)).toFixed(
                        2
                     )}{" "}
                     ₹
                  </span>
               </div>
               <Button type="primary">
                  <Link className="checkdiv" to={"/checkout"}>
                     Checkout
                  </Link>
               </Button>
            </div>
         </div>
      </>
   );
};
