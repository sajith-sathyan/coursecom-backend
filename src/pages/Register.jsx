import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance, baseURL, userRoutes } from "../api/api";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import updatePageVisit from "../Helper/AnalyticsService";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
    status: true,
    createdAt: Date.now(),
  });

  const handleError = (name, email, password, password2) => {
    let errorMessage = "";
    if (!name) {
      errorMessage = "Name field is empty";
    } else if (!email) {
      errorMessage = "Email field is empty";
    } else if (!password) {
      errorMessage = "Password field is empty";
    } else if (!password2) {
      errorMessage = "Repeat password field is empty";
    } else if (password !== password2) {
      errorMessage = "Passwords do not match";
    }
    return errorMessage;
  };

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formError = handleError(
      userData.name,
      userData.email,
      userData.password,
      userData.password2
    );

    if (formError) {
      setError(formError);
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}${userRoutes}/user`,
        {
          ...userData,
        }
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        const token = response.data.token;
        Cookies.set('token', token); 
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    updatePageVisit('Register')

  },[])

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>

        <form className="form register__form">
          {error && <p className="form__error-message">{error}</p>}

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
          />

          <button type="submit" onClick={handleSubmit} className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account ? <Link to="/login">Sign in</Link>
        </small>
      </div>
    </section>
  );
}

export default Register;
