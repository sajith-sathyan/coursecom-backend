import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  axiosInstance,
  baseURL,
  contentDeliveryService,
  courseRoutes,
  notificationService,
  userRoutes,
} from "../api/api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Modal from "../components/PopUp";
import Spinner from "../components/Spinner"; // Import Spinner component

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [additionalInviteEmail, setAdditionalInviteEmail] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [statusMessage, setStatusMessage] = useState(""); // Add status message state
  const [globalStatusMessage, setGlobalStatusMessage] = useState(""); // Global status message
  const [isSuccess, setIsSuccess] = useState(false); // Track success or error status

  const userDataString = Cookies.get("userData");
  const userData = JSON.parse(userDataString);
  const userId = userData._id;

  const fetchCoursesDetails = async (userId) => {
    console.log("userId--->",userId)
    try {
      const { data } = await axiosInstance.get(
        `${baseURL}${courseRoutes}/course/findByUserId/${'6682beb7a1cc6b242f57cfa2'}`
      );
      console.log("Courses data:", data);
      setCourses(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInviteSubmit = async () => {
    try {
      if (!selectedCourseId) {
        console.log("No course selected");
        return;
      }
      setIsLoading(true); // Start loading
      setStatusMessage(""); // Clear previous status message

      // Fetch users by course ID
      const { data } = await axiosInstance.get(
        `${baseURL}${contentDeliveryService}/CDS/getUserById/${selectedCourseId}`
      );

      if (data) {
        const userIdArray = data?.users?.userIdArray || [];
        const userArray = await getAllUserWithIds(userIdArray);
        await sendEmailAndMessage(userArray);
        setIsModalOpen(false);
      }

      setIsLoading(false); // Stop loading
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Stop loading
      setStatusMessage("Failed to send emails."); // Set error message
      setGlobalStatusMessage("Failed to send emails."); // Set global error message
      setIsSuccess(false); // Mark as error
      setTimeout(() => setGlobalStatusMessage(""), 5000); // Clear message after 5 seconds
    }
  };

  const sendEmailAndMessage = async (emails) => {
    try {
      if (additionalInviteEmail) {
        const additionalEmails = additionalInviteEmail.split(',')
          .map(email => email.trim())
          .filter(email => email);
  
        emails = [...emails, ...additionalEmails];
      }
  
      const { data } = await axiosInstance.post(
        `${baseURL}${notificationService}/notification/sendEmailAndMessage`,
        { emails, message: inviteEmail }
      );
  
      console.log("Emails sent to:", emails);
      setInviteEmail("");
      setAdditionalInviteEmail("");
      setStatusMessage("Emails sent successfully!");
      setGlobalStatusMessage("Emails sent successfully!"); // Set global status message
      setIsSuccess(true); // Mark as success
      setTimeout(() => setGlobalStatusMessage(""), 5000); // Clear message after 5 seconds
      setIsModalOpen(false);
  
      return data;
    } catch (err) {
      console.log(err);
      setStatusMessage("Failed to send emails."); // Set error message
      setGlobalStatusMessage("Failed to send emails."); // Set global error message
      setIsSuccess(false); // Mark as error
      setTimeout(() => setGlobalStatusMessage(""), 5000); // Clear message after 5 seconds
    } finally {
      setIsLoading(false); // Ensure loading is stopped in case of success or error
    }
  };

  const getAllUserWithIds = async (ids) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseURL}${userRoutes}/user/findByIds`,
        { ids }
      );
      const userEmails = data.map((user) => user.email);
      return userEmails;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    fetchCoursesDetails(userId);
  }, [userId]);

  return (
    <>
      <Header />
      {globalStatusMessage && (
        <div className={`global-status-message ${isSuccess ? 'success' : 'error'}`}>
          {globalStatusMessage}
        </div>
      )}
      <section className="dashboard">
        {courses.length ? (
          <>
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
                      onClick={() => {
                        setSelectedCourseId(course._id);
                        setIsModalOpen(true);
                      }}
                    >
                      Message
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>Send Email to People Who Purchased This Course</h3>
                <br />
                <input
                  type="text"
                  placeholder="Enter the message"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <br />
                <p>
                  To send this email to people who have not purchased the
                  course, enter their email addresses here:
                </p>
                <br />
                <input
                  type="email"
                  placeholder="Enter their email addresses here"
                  value={additionalInviteEmail}
                  onChange={(e) => setAdditionalInviteEmail(e.target.value)}
                />
                <br />
                <br />
                <button className="btn sm" onClick={handleInviteSubmit} disabled={isLoading}>
                  {isLoading ? <Spinner /> : "Send Mail"}
                </button>
                {statusMessage && <p>{statusMessage}</p>}
              </Modal>
            )}
          </>
        ) : (
          <h2 className="center">You have no course yet.</h2>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Dashboard;
