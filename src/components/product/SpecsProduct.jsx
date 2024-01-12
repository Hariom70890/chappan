import React from "react";
import { Button, Image, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/cart/action";
import { Link } from "react-router-dom";
import { addItemName } from "../redux/Item/ItemAction";

export const SpecsProduct = ({ name, image, price, btnText, id }) => {
  const dispatch = useDispatch();
  const AddCart = () => {
    const payload = {
      Id: Math.trunc(Math.random() * 1000),
      Name: name,
      Image: image,
      Price: price,
    };

    alert("Item Added to cart");
    dispatch(addTodo(payload));
  };

  return (
    <>
      <div>
        <Image height={"100%"} src={image} alt="" />
      </div>
      <div>
        <h3>Dish :- {name}</h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p> price :- {price.substring(0, 3)}.00 ₹</p>
          <p>rating :- {(Math.random() * (10 - 1 + 1)).toFixed(1)} ★</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={AddCart}>{btnText}</Button>
          <Button
            onClick={() => {
              dispatch(addItemName(name));
            }}
          >
            <Link to={"/description"}>Show Details</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
