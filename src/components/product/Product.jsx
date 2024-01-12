import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { SpecsProduct } from "./SpecsProduct";
import "./Product.css";
import { Button } from "antd";

import { useDispatch } from "react-redux";

export const Product = () => {
  const [meals, setMeals] = useState([]);
  const dispatch = useDispatch();

  const [text, setText] = useState("Italian");
  const arr = [
    "American",
    "indian",
    "Canadian",
    "Russian",
    "Italian",
    "chinese",
    "mexican",
    "french",
  ];

  const HandleChange = (val) => {
    setText(val);
  };

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${text}`)
      .then((data) => setMeals(data.data.meals));
  }, [text]);

  if (!meals) return null;

  return (
    <div className="pdbox">
      <div className="box">
        {arr.map((v, i) => {
          return (
            <>
              <Button key={i} className="cat" onClick={() => HandleChange(v)}>
                {v}
              </Button>
            </>
          );
        })}
      </div>
      <div className="meals">
        {meals.map((e, i) => {
          return (
            <div className="mealcompo">
              <SpecsProduct
                name={e.strMeal}
                image={e.strMealThumb}
                price={e.idMeal}
                btnText={"Add To cart"}
                id={i * 5}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
