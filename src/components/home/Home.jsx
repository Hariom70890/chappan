import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd";
import "./Home.css";
import { Corosel } from "./Corosel";
import { ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemName } from "../redux/Item/ItemAction";

export const Home = () => {
  const [meals, setMeals] = useState([]);
  const [text, setText] = useState("Italian");
  const dispatch = useDispatch();
  const arr = [
    "French",
    "indian",
    "Canadian",
    "Russian",
    "Italian",
    "chinese",
    "mexican",
    "British",
  ];

  const HandleChange = (val) => {
    setText(val);
  };

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${text}`)
      .then((data) => {
        setMeals(data.data.meals);
      });

    return () => {};
  }, [text]);

  return (
    <div className="classbgcolor">
      <div>
        <Corosel />

        <div className="box">
          {arr.map((v) => {
            return (
              <>
                <Button className="cat" onClick={() => HandleChange(v)}>
                  {v}
                </Button>
              </>
            );
          })}
        </div>

        <div className="Main">
          <ImageList className="imglst" sx={{ height: 350 }} gap={20}  cols={4} rowHeight={350}>
            {meals.map((e) => {
              return (
                <div className="classbgcolor">
                  <ImageListItem key={e.img}>
                    <img
                      src={`${e.strMealThumb}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${e.strMealThumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={e.strMeal}
                      loading="lazy"
                    />
                    <Button>{e.strMeal}</Button>
                    <Button
                      onClick={() => {
                        dispatch(addItemName(e.strMeal));
                      }}
                    >
                      <Link to={"/description"}>Show Details</Link>
                    </Button>
                  </ImageListItem>
                </div>
              );
            })}
          </ImageList>
        </div>
      </div>
    </div>
  );
};
