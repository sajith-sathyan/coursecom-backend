import React, { useEffect, useState } from "react";
import { axiosInstance, baseURL, courseRoutes, userRoutes } from "../api/api";
function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchAllCourse();
    getAllUser();
  }, []);
  const handleToggle = async (courseId, currentStatus, index) => {
    const course = courses[index];
    console.log(course)
    try {
      // Toggle the status locally
      const updatedCourses = [...courses];
      updatedCourses[index].status = !currentStatus;
      setCourses(updatedCourses);
  
      const updatedData = {
        _id: course._id, 
        courseTitle: course.title, 
        price: course.price, 
        category: course.category, 
        description: course.description, 
        thumbnailImg: course.thumbnailUrl, 
        videoFiles: course.videos,
        userId: course.userId,
        createdAt: Date.now(), 
        status: !currentStatus, 
      };
      
  
      // Update the status in the database
      const response = await axiosInstance.put(
        `${baseURL}${courseRoutes}/course/${courseId}`,
        updatedData
      );
  
      // Log the response after updating the status
      console.log("Response after toggling status:", response.data);
  
      // After successful update, fetch all courses again to reflect the changes
      fetchAllCourse();
    } catch (error) {
      console.error("Error toggling course status:", error);
    }
  };
  
  

  const fetchAllCourse = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}${courseRoutes}/course`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUser = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}${userRoutes}/user`);
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div id="content">
      <main>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Course List</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Email</th>
                  <th>Status</th>
                  {/* Add a new column for the switch */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => {
                  // Find the corresponding user data
                  const user = userData.find(
                    (user) => user._id === course.userId
                  );
                  return (
                    <tr key={index}>
                      <td>
                        <p>{course.title}</p>
                      </td>
                      <td>
                        {user && user._id === course.userId ? user.email : ""}
                      </td>
                      <td>
                        <span
                          className={`status ${
                            course.status ? "unblock" : "block"
                          }`}
                        >
                          {course.status ? (
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
                          checked={course.status}
                          onChange={() =>
                            handleToggle(course._id, user.status, index)
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseTable;
