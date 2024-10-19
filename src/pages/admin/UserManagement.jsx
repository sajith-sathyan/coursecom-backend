// UserManagement.js
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import Table from "../../components/Table";
import { axiosInstance, baseURL, userRoutes } from "../../api/api";
import UserTable from "../../components/UserTable";

function UserManagement() {
  const [userData, setUserData] = useState([]);
  
  const getAllUser = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}${userRoutes}/user`);
      setUserData(res.data); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <AdminSidebar currentPage={"User Management"} />
      <UserTable userData={userData} getAllUser={getAllUser} />
    </>
  );
}

export default UserManagement;
