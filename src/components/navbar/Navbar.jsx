import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/login/LoginAction";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { addItemName } from "../redux/Item/ItemAction";
import axios from "axios";

export const Navbar = () => {
  const data = useSelector((state) => state.login.LoginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [srcValue, setSrcValue] = useState(null);
  const [searchMeal, setSearchMeal] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" className="Navbox">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chappan
          </Typography>
          {pathname === "/" && (
            <div className="navinp">
              <select name="">
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
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: 2,
          }}
          role="presentation"
          onClick={closeDrawer}
          onKeyDown={closeDrawer}
        >
          <Link to="/">
            <Button color="inherit" sx={{ marginTop: 1 }}>
              Home
            </Button>
          </Link>
          <Link to="/product">
            <Button color="inherit" sx={{ marginTop: 1 }}>
              Product
            </Button>
          </Link>
          <Link to="/cart">
            <Button color="inherit" sx={{ marginTop: 1 }}>
              Cart
            </Button>
          </Link>
          <Link to="/about">
            <Button color="inherit" sx={{ marginTop: 1 }}>
              About
            </Button>
          </Link>
          {data ? (
            <div className="user">
              <Typography
                variant="body2"
                sx={{
                  width: "fit-content",
                  fontWeight: "lighter",
                  marginTop: 1,
                }}
              >
                Hi, {data.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  border: "1px solid pink",
                  fontWeight: "lighter",
                  padding: 1,
                  marginLeft: 2,
                  marginTop: 1,
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(logoutUser(null));
                }}
              >
                Logout
              </Typography>
            </div>
          ) : (
            <Link to="/login">
              <Button color="inherit" sx={{ marginTop: 1 }}>
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Drawer>

      {pathname === "/" && (
        <Container>
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", marginTop: -20, marginBottom: 2 }}
          >
            Discover the best food
          </Typography>
          <Box
            className="searchmeal"
            sx={{
              width: "30%",
              maxHeight: 160,
              margin: "auto",
              backgroundColor: "white",
              overflowX: "hidden",
              overflowY: "auto",
              zIndex: 99999999,
            }}
          >
            {searchMeal.map((e) => (
              <Box
                key={e.strMeal}
                onClick={() => {
                  dispatch(addItemName(e.strMeal));
                  navigate("/description");
                }}
                className="searchmealchild"
              >
                <img src={e.strMealThumb} alt="" />
                <Typography variant="body2">{e.strMeal}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};
