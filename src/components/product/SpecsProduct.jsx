import React from "react";
import { Button, Image, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/cart/action";
import { Link } from "react-router-dom";
import { addItemName } from "../redux/Item/ItemAction";
import { Box } from "@mui/material";
import Swal from 'sweetalert2'

// or via CommonJS
export const SpecsProduct = ({ name, image, price, btnText, id }) => {
  const Swal = require('sweetalert2')
  const dispatch = useDispatch();
  const AddCart = () => {
    const payload = {
      Id: Math.trunc(Math.random() * 1000),
      Name: name,
      Image: image,
      Price: price,
      Quantity: 1,
    };
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item Added to Cart",
      showConfirmButton: false,
      timer: 1500
    });
    dispatch(addTodo(payload));
  };

  return (
    <>
      <Box>
        <Image height={"100%"} src={image} alt="" />
      </Box>
      <Box>
        <h3>Dish :- {name}</h3>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <p> price :- ₹{price.substring(0, 3)}.00 </p>
          <p>rating :- {(Math.random() * (10 - 1 + 1)).toFixed(1)} ★</p>
        </Box>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={AddCart}>{btnText}</Button>
          <Button
            onClick={() => {
              dispatch(addItemName(name));
            }}
          >
            <Link to={"/description"}>Show Details</Link>
          </Button>
        </Box>
      </Box>
    </>
  );
};
