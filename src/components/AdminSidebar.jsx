import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminSidebar({ currentPage }) {
  const [activeItem, setActiveItem] = useState(currentPage);
  const Navigate = useNavigate()
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const handleLogOut = ()=>{
    Cookies.remove("admin");
    Navigate('/admin/login')
  }

  return (
    <section id="sidebar">
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">CourseCom Admin</span>
      </a>
      <ul className="side-menu top">
        <li className={activeItem === "Dashboard" ? "active" : ""}>
          <a href="/admin" >
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li className={activeItem === "User Management" ? "active" : ""}>
          <a href="/admin/userManagement" >
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="text">User Management</span>
          </a>
        </li>
        <li className={activeItem === "Course Management" ? "active" : ""}>
          <a href="/admin/courseManagement">
            <i className="bx bxs-doughnut-chart"></i>
            <span className="text">Course Management</span>
          </a>
        </li>
        <li className={activeItem === "Video Call Management" ? "active" : ""}>
          <a href="/admin/videocallManagement" >
            <i className="bx bxs-message-dots"></i>
            <span className="text">Video Call Management</span>
          </a>
        </li>
        <li className={activeItem === "Category Management" ? "active" : ""}>
          <a href="/admin/categoryManagement" >
            <i className="bx bxs-group"></i>
            <span className="text">Category Management</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a onClick={handleLogOut} className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AdminSidebar;
