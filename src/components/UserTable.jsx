import React, { useState } from "react";
import { axiosInstance, baseURL, userRoutes } from "../api/api";

function UserTable({ userData, getAllUser }) {
  const [userStatus, setUserStatus] = useState({});

  const handleToggle = async (userId, status, index) => {
    const user = userData[index];
    const UpdateUserData = {
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
      status: !status,
    };

    try {
      const response = await axiosInstance.put(
        `${baseURL}${userRoutes}/user/${userId}`,
        UpdateUserData
      );
      const updatedUser = response.data;
      getAllUser()
      console.log("Update successful:", updatedUser);
    } catch (error) { 
      console.error("Error updating user:", error);
    }
  };

  return (
    <div id="content">
      <main>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>User List</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  {/* Add a new column for the switch */}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <p>{user.username}</p>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`status ${user.status}`}>
                        {user.status ? (
                          <span className="status unblock">Active</span>
                        ) : (
                          <span className="status block">Blocked</span>
                        )}
                      </span>
                    </td>
                    {/* Add a new column for the switch */}
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={user.status}
                          onChange={() =>
                            handleToggle(user._id, user.status, index)
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserTable;
