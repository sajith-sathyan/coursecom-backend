import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  axiosInstance,
  baseURL,
  courseRoutes,
} from "../api/api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Modal from "../components/PopUp";

function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");

  const userDataString = Cookies.get("userData");
  const userData = JSON.parse(userDataString);
  const userId = userData._id;

  const fetchCoursesDetails = async (userId) => {
    try {
      const { data } = await axiosInstance.get(`${baseURL}${courseRoutes}/course/findByUserId/${userId}`);
      console.log("res--->", data);

      // Assuming `data` is an array of courses
      setCourses(data || []);
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
    fetchCoursesDetails(userId);
  }, [userId]);

  return (
    <>
      <Header />
      <section className="dashboard">
        {courses.length ? (
          <div className="container dashboard__container">
            {courses.map((course) => (
              <article key={course._id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={course.thumbnailUrl} alt={course.title} />
                  </div>
                  <h5>{course.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/course/${course._id}`} className="btn sm">
                    View
                  </Link>
                </div>
                <div className="dashboard__post-actions">
                  <button
                    className="btn sm"
                    onClick={() => handleInvite(course)}
                  >
                    Invite
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <h2 className="center">You have no course yet.</h2>
        )}
      </section>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3>Send Email to People Who Purchased This Course</h3>
          <br />
          <input
            type="email"
            placeholder="Enter the message"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <br />
          <br />
          <button className="btn sm" onClick={handleInviteSubmit}>
            Send Mail
          </button>
        </Modal>
      )}

      <Footer />
    </>
  );
}

export default MyCourse;
