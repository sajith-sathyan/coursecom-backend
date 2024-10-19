import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";

function Header() {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isNavShowIn, setIsNavShowIn] = useState(window.innerWidth > 800 ? true : false);
  const userDataString = Cookies.get("userData");

  const user = JSON.parse(userDataString);
  const navigate = useNavigate();

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowIn(false);
    } else {
      setIsNavShowIn(true);
    }
  };

  const getUserDataFromCookies = () => {
    const userDataCookie = Cookies.get("userData");
    const accessTokenCookie = Cookies.get("accessToken");

    if (userDataCookie && accessTokenCookie) {
      const userData = JSON.parse(userDataCookie);
      const accessToken = accessTokenCookie;

      setUserData(userData);
      setAccessToken(accessToken);
    }
  };

  useEffect(() => {
    getUserDataFromCookies();
  }, []);

  const handleLogout = () => {
    // Remove user data and access token from cookies
    Cookies.remove("userData");
    Cookies.remove("accessToken");
    // Clear user data and access token from state
    setUserData(null);
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="container nav__container">
          <Link to="/" className="nav__logo" onClick={closeNavHandler}>
            <img src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png" alt="" />
          </Link>
          {isNavShowIn && (
            <ul className="nav__menu">
              {accessToken && (
                <>
                  <li>
                    <Link to="/profile/:id" onClick={closeNavHandler}>
                      {userData.username}
                    </Link>
                  </li>
                  <li>
                    <Link to="/create" onClick={closeNavHandler}>
                      Create Course
                    </Link>
                  </li>
                  <li>
                    <Link to={`/myCourse/${user._id}`} onClick={closeNavHandler}>
                    My Course
                    </Link>
                  </li>
                  <li>
                    <Link to={`/buyedCourses/${user._id}`} onClick={closeNavHandler}>
                    Purchased
                    </Link>
                  </li>
                  <li>
                    <Link to="/introduction" onClick={closeNavHandler}>
                      Join Live
                    </Link>
                  </li>
                </>
              )}
              <li>
                {accessToken ? (
                  <Link
                    onClick={() => {
                      handleLogout();
                      closeNavHandler();
                    }}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link to="login">Login</Link>
                )}
              </li>
            </ul>
          )}
          <button
            className="nav__toggle-btn"
            onClick={() => setIsNavShowIn(!isNavShowIn)}
          >
            {isNavShowIn ? <AiOutlineClose /> : <FaBars />}
          </button>
        </div>
      </nav>
      <div className="content">{/* Content of the page goes here */}</div>
    </>
  );
}

export default Header;
