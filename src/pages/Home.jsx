import React, { useEffect, useState } from "react";
import Courses from "../components/Courses";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { axiosInstance, baseURL, courseRoutes } from "../api/api";
import updatePageVisit from "../Helper/AnalyticsService";

function Home() {
  const [courses, setCourses] = useState([]);

  const getUserDataFromCookies = () => {
    const userDataCookie = Cookies.get("userData");
    const accessTokenCookie = Cookies.get("accessToken");

    if (userDataCookie && accessTokenCookie) {
      const userData = JSON.parse(userDataCookie);
      const accessToken = accessTokenCookie;

      console.log("User Data:", userData);
      console.log("Access Token:", accessToken);
    }
  };

  useEffect(() => {
    getUserDataFromCookies();
    updatePageVisit('Home')
  }, []);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:8000");
    //     const responseUser = await axios.get(
    //       "http://localhost:8000/userService"
    //     );
    //     // Handle the response data if needed
    //     console.log(response.data);
    //   } catch (error) {
    //     // Handle errors
    //     console.error("Error fetching data:", error);
    //   }
    // };
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`${baseURL}${courseRoutes}/course`);
        console.log(response.data);
        if(response.data){
          setCourses(response.data)
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    

    
    fetchCourse()
  }, []);

  return (
    <div>
      <Header />
      <Courses courses={courses} />
      <Footer/>
    </div>
  );
}

export default Home;
