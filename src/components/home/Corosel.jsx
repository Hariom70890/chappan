import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Corosel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export const Corosel = () => {
  const [corosel, setCorosel] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=British`)
      .then((data) => {
        setCorosel(data.data.meals);
      });
  }, []);

  return (
    <div className="coro">
      <h1 style={{ textAlign: "center" ,color : 'grey' }}>COLLECTION'S</h1>
      <h4 style={{ textAlign: "center" ,color : 'grey' }}>
        Explore curated lists of top foods
      </h4>

      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={1500}
        showStatus={false}
      >
        {corosel.map((e) => {
          return (
            <div>
              <img className="sldImage" src={e.strMealThumb} alt="" />
              <p className="legend">{e.strMeal}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
