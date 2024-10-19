import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminRoutes, axiosInstance, baseURL } from "../../api/api";
import Cookies from "js-cookie";

function AdminLogin() {
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
        `${baseURL}${adminRoutes}/admin/login`,
        {
          ...userData,
        }
      );
      console.log(response.data);
      if (response.data) {
        // Set cookie with name "admin" to true
        Cookies.set("admin", "true");
        navigate("/admin");
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

export default AdminLogin;
