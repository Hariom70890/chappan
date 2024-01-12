import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cart/action";
import "./Checkout.css";

export const Checkout = () => {
  const items = useSelector((state) => state.cart.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pay,setPay]=useState('');

  const HandleCheckout = (e) => {
    e.preventDefault();
    if(pay!=="on"){
      alert("Please choose payment method");
      return;
    }
    alert("Order Confirmed");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="chk">
      <div className="chkmain">
        <form onSubmit={HandleCheckout}>
          <p>Enter Name</p>
          <input required type="text" />

          <p>Enter Mobile No.</p>
          <input required type="number" />

          <p>Enter Address</p>
          <input required type="text" />

          <p>Enter Pincode</p>
          <input required type="number" />

          <p>Alternate Mobile No.</p>
          <input required type="number" />
          <br />
          <div className="paynow">
          <input required onClick={(e)=>{setPay(e.target.value)}} type="radio" />
          <span>Pay on Delivery</span>
          </div>
          <br />
          <input
            style={{ width: "200px" }}
            className="cbtn"
            type="submit"
            value={"Confirm Order"}
          />
        </form>
      </div>
    </div>
  );
};
