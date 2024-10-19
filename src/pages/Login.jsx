import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {axiosInstance,baseURL,userRoutes} from '../api/api'
import axios from "axios";
import Cookies from "js-cookie";
import updatePageVisit from "../Helper/AnalyticsService";

function Login() {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleError = (email, password) => {
    if (!email) {
      return "Email field is empty";
    } else if (!password) {
      return "Password field is empty";
    } else {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formError = handleError(userData.email, userData.password);

    if (formError) {
      setError(formError);
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${baseURL}${userRoutes}/auth`,
        {
          ...userData,
        }
      );

      if (response.data.user && response.data.token) {
        // Set user data and token in cookies
        Cookies.set("userData", JSON.stringify(response.data.user));
        Cookies.set("accessToken", response.data.token);
        const userId = response.data.user.userId;
        Cookies.set("userId", userId);
        // Redirect to home page
        navigate("/");
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    updatePageVisit('Login')

  },[])

  return (
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>

        <form className="form login__form">
          {error && <p className="form__error-message">{error}</p>}

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />

          <button onClick={handleSubmit} type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account ? <Link to="/register">Sign up</Link>
        </small>
      </div>
    </section>
  );
}

export default Login;
