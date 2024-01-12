import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../redux/cart/action";

import "./Description.css";

export const Description = () => {
  const { item } = useSelector((state) => state.item);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [meal, setMeal] = useState([]);
  let id;

  const AddCart = () => {
    const payload = {
      Id: Math.trunc(Math.random() * 1000),
      Name: meal[0].strMeal,
      Image: meal[0].strMealThumb,
      Price: meal[0].idMeal,
    };
    alert("Item Added To Cart");
    dispatch(addTodo(payload));
  };

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item[0]}`)
      .then((data) => {
        setMeal(data.data.meals);
      });

    return () => {};
  }, [item]);

  return (
    <div className="desc">
      {meal.map((e, i) => {
        id = i * 5;
        return (
          <>
            <div className="descbox">
              <div>
                <img src={e.strMealThumb} alt="" />
              </div>
              <div>
                <h4>Name :-{e.strMeal}</h4>
                <h4> Category :-</h4>
                <p>
                  {" "}
                  {e.strCategory} , {e.strArea}
                </p>

                <h4>Ingredients :-</h4>
                <p>
                  {" "}
                  {e.strIngredient1}, {e.strIngredient2} , {e.strIngredient3},{" "}
                  {e.strIngredient4} , {e.strIngredient5} , {e.strIngredient6} ,{" "}
                  {e.strIngredient7},{e.strIngredient8}
                </p>

                <h4>Measure :-</h4>
                <p>
                  {e.strMeasure1} , {e.strMeasure2} , {e.strMeasure3} ,{" "}
                  {e.strMeasure4}, {e.strMeasure5} , {e.strMeasure6} ,{" "}
                  {e.strMeasure7} , {e.strMeasure8}
                </p>

                <h4>Instructions :-</h4>
                <p style={{textAlign : "left"}}> {e.strInstructions}</p>
                <Button
                  style={{ marginRight: "5px" ,marginBottom : "10px" }}
                  onClick={() => {
                    navigate("/product");
                  }}
                >
                  Back To Products
                </Button>
                <Button
                  style={{ marginRight: "5px" ,marginBottom : "10px" }}
                  onClick={AddCart}
                >
                  Add To Cart
                </Button>
                <Button  
                  style={{ marginBottom : "10px"}}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  Go To Cart
                </Button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
