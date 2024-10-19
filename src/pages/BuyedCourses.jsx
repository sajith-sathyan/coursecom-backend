import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { axiosInstance, baseURL, contentDeliveryService, courseRoutes } from "../api/api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Modal from "../components/PopUp"; 


function BuyedCourses() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");

  const userDataString = Cookies.get("userData");
  const userData = JSON.parse(userDataString);

  const fetchCoursesDetails = async (userId) => {
    try {
      const res = await axiosInstance.get(
        `${baseURL}${contentDeliveryService}/CDS/getCourseById/${userId}`
      );
      console.log(res.data.course.courseIdArray);
      if (res.data.course) {
        const ids = res.data.course.courseIdArray;
        getBuyedCourse(ids);
      }
      setCourses(res.data.course);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getBuyedCourse = async (ids) => {
    try {
      const res = await axiosInstance.post(`${baseURL}${courseRoutes}/course/getCourseByIds`, {
        ids: ids
      });

      if (res.data) {
        setCourses(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInvite = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleInviteSubmit = async () => {
    try {
      // Implement your invite logic here, e.g., send an email or notification
      console.log(`Inviting ${inviteEmail} to the course ${selectedCourse.title}`);
      // Close the modal after sending the invite
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoursesDetails(userData._id);
  }, []);

  return (
    <>
      <Header />
      <section className="dashboard">
        {courses.length ? (
          <div className="container dashboard__container">
            {courses.map((course) => {
              return (
                <article key={course.id} className="dashboard__post">
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img src={course.thumbnailUrl} alt="" />
                    </div>
                    <h5>{course.title}</h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to={`/course/${course._id}`} className="btn sm">
                      View
                    </Link>
                  </div>
                  <div className="dashboard__post-actions">
                    <button className="btn sm" onClick={() => handleInvite(course)}>
                      Invite
                    </button>
                  </div>
                </article>
              );
            })} ee  
          </div>
        ) : (
          <h2 className="center">You have no course purchased yet.</h2>
        )}
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Send Email to People Who Purchased This Course</h3>
        <br />
        <input
          type="email"
          placeholder="Enter the message "
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
        />
        <br />
        <br />
        <button className="btn sm" onClick={handleInviteSubmit}>
          Send Mail
        </button>
      </Modal>

      <Footer />
    </>
  );
}

export default BuyedCourses;
