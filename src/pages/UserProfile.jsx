import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import updatePageVisit from "../Helper/AnalyticsService";
import Cookies from "js-cookie";

function UserProfile() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassowrd, setConfirmPassword] = useState("");
  const userDataString = Cookies.get("userData");
  const userData = JSON.parse(userDataString);

  useEffect(() => {
    updatePageVisit("UserProfile");
  }, []);
  return (
    <>
      <Header />
      <section className="profile">
        <div className="container profile__container">
          <div className="profile__Link">
            {" "}
            <Link to={`/mycourse/$${userData._id}`} className="btn">
              My Courses
            </Link>
            <Link to={`/buyedCourses/${userData._id}`} className="btn">
              Buyed Courses
            </Link>
          </div>
          <div className="profile__details">
            <div className="avatar__wrapper">
              <div className="profile__avatar">
                <img
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt=""
                />
              </div>
              <form className="avatar__form">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="png,jpg,jpeg"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <label htmlFor="avatar" className="avatar__edit-icon">
                  <FaEdit />
                </label>
              </form>
            </div>
            <h2> Sajith Lal </h2>
            <form className="form profile__form">
              <p className="form__error-message">This is an error message</p>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm new Password"
                value={confirmNewPassowrd}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="btn primary">
                Update details
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UserProfile;
