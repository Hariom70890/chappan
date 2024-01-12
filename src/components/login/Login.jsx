import { Button, Checkbox, Form, Input } from "antd";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../redux/login/LoginAction";

import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup.signupData);
  const { handlerAuth } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    id: Math.trunc(Math.random() * 1000),
    name: "",
    email: email,
    password: password,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let count = 0;

    signup.forEach((val) => {
      if (val.Email === email && val.Password === password) {
        count++;
        data.name = val.Name;
        alert("login successfull !!");
        dispatch(loginUser(data));
        handlerAuth(!isAuth);
        navigate("/");
      }
    });
    if (count === 0) {
      alert("please fill valid details or signup fisrt");
    }
  };

  return (
    <div className="lgbox">
      <div className="loginbox">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <h4>Enter Email</h4>
            <input
              required
              className="formlog"
              placeholder="Enter Your Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <h4>Enter Password</h4>
            <input
              required
              className="formlog"
              placeholder="Enter Your Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <input className="loginbtn" type="submit" value={"Login"} />
        </form>

        <div>
          <p>
            New User! <Link to={"/signup"}>SignUp</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
