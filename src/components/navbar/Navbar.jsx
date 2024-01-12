import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/login/LoginAction";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { addItemName } from "../redux/Item/ItemAction";
import axios from "axios";
export const Navbar = () => {
  const data = useSelector((state) => state.login.LoginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [srcValue, setSrcValue] = useState(null);
  const [searchMeal, setSearchMeal] = useState([]);
  const pathname = window.location.pathname;
  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    setSearchMeal([]);
  }, [srcValue]);

  const handleSearch = () => {
    if (srcValue === "") {
      return;
    }
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${srcValue}`)
      .then((data) => {
        if (data.data.meals) {
          setSearchMeal(data.data.meals);
        }
      });
  };

  return (
    <>
      <div className="Navbox">
        <div className="box1">
          <div></div>
          <div>
            <Link to={"/"}>
              {" "}
              <h3>Home</h3>{" "}
            </Link>
            <Link to={"/product"}>
              {" "}
              <h3>Product</h3>
            </Link>
            <Link to={"/cart"}>
              <h3>Cart</h3>
            </Link>
            <Link to={"/about"}>
              <h3>About</h3>
            </Link>
            {data ? (
              <div className="user">
                <h3 className="user1">Hi, {data.name}</h3>
                <p
                  className="user2"
                  onClick={() => {
                    dispatch(logoutUser(null));
                  }}
                >
                  Logout
                </p>
              </div>
            ) : (
              <Link to={"/login"}>
                <h3>Login</h3>
              </Link>
            )}
          </div>
        </div>
        <div className="box2">
          <h1 style={{ marginTop: pathname == "/" ? "-20px" : "" }}>Chappan</h1>
          <h1 style={{ marginTop: pathname == "/" ? "-20px" : "" }}>
            Discover the best food
          </h1>
          {pathname === "/" ? (
            <div
              className="navinp"
              style={{ marginTop: pathname == "/" ? "-20px" : "" }}
            >
              <select name="" id="">
                <option value="indore">Indore</option>
              </select>
              <form action=""></form>
              <input
                type="text"
                placeholder="Get the delicious food of Chappan !!!"
                onInput={(e) => {
                  setSrcValue(e.target.value);
                }}
              />
              <SearchIcon
                onClick={handleSearch}
                style={{ color: "grey", padding: "5px" }}
                sx={{ "&:hover": { cursor: "pointer", color: "green" } }}
              />
            </div>
          ) : (
            <></>
          )}
          {pathname === "/" ? (
            searchMeal ? (
              <div className="searchmeal">
                {searchMeal.map((e) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(addItemName(e.strMeal));
                        navigate("/description");
                      }}
                      className="searchmealchild"
                    >
                      <img src={e.strMealThumb} alt="" />
                      <p>{e.strMeal}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
