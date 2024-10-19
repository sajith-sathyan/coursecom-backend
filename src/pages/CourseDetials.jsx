import React, { useEffect, useState, useRef } from "react";
import CourseAuthor from "../components/CourseAuthor";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  axiosInstance,
  baseURL,
  contentDeliveryService,
  courseRoutes,
} from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import updatePageVisit from "../Helper/AnalyticsService";

function CourseDetails() {
  const [courseData, setCourseData] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const videoRef = useRef(null);
  const { id } = useParams();
  const [userInteracted, setUserInteracted] = useState(false);
  const userDataString = Cookies.get("userData");

  const userData = JSON.parse(userDataString);
  
  Cookies.set("courseId",id );


  const navigate = useNavigate();
  // Define getCourseById function
  const getCourseById = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}${courseRoutes}/course/${id}`
      );
      console.log(response.data);
      const data = response.data;
      setCourseData(data);
      return data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  };
  const checkPurchaseStatus = async () => {
    try {
      const res = await axiosInstance.post(
        `${baseURL}${contentDeliveryService}/CDS/checkPurchaseStatus`,
        {
          courseId: id,
          userId: userData._id,
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourseById(id);
    updatePageVisit("Course Detials");
    checkPurchaseStatus();
  }, [id]);

  useEffect(() => {
    if (userInteracted && selectedVideoUrl) {
      playVideo();
    }
  }, [selectedVideoUrl, userInteracted]);

  useEffect(() => {
    if (userInteracted && selectedVideoUrl) {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      playVideo();
    }
  }, [selectedVideoUrl]);

  // Function to handle video selection
  const handleVideoSelect = (videoUrl, index) => {
    if (videoRef.current && !videoRef.current.paused) {
      // Pause the currently playing video
      videoRef.current.pause();
    }
    if (selectedVideoUrl !== videoUrl) {
      // Only update the selected video URL and play it if it's different from the current one
      setSelectedVideoUrl(videoUrl);
      setUserInteracted(true);
      playVideo();
    }
  };

  // Function to play the video
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const hadnlePriceSubmit = () => {
    navigate(`/purchase/${courseData.price}`);
  };

  return (
    <>
   <Header/>
      <section className="post-detail">
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <CourseAuthor />
            <div className="post-detail__buttons">
              <div onClick={hadnlePriceSubmit} className="btn sm primary">
                Rs. {courseData.price}
              </div>
              {/* <Link to={`/course/${id}/delete`} className="btn sm danger">
                Delete
              </Link> */}
            </div>
          </div>
          <h1>{courseData.title}</h1>
          <br />

          {/* Display video thumbnail and other content */}
          <div className="items-center lg:flex video-list__container">
            {/* Display video thumbnail */}
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 lg:mr-6">
              <video
                ref={videoRef}
                className="w-full h-full lg:max-w-3xl"
                controls
              >
                {selectedVideoUrl && (
                  <source src={selectedVideoUrl} type="video/mp4" />
                )}
              </video>
            </div>
            {/* Display related user cards */}
            <div className="w-full lg:w-1/2 flex-grow max-w-xl">
              <div className="shadow-lg overflow-hidden">
                <ul className="divide-y overflow-y-auto max-h-96">
                  {courseData.videos && courseData.videos.length > 0 && (
                    <>
                      {courseData.videos.map((video, index) => (
                        <>
                          <li
                            onClick={() => {
                              handleVideoSelect(video.url, index);
                            }}
                            key={index}
                            className="p-3 flex justify-between items-center user-card"
                          >
                            <div className="flex items-center">
                              <a className="ml-3 font-medium">{video.name}</a>
                            </div>
                          </li>
                          <br />
                        </>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Display post detail description */}
          <div
            className="post-detail__thumbnail"
            dangerouslySetInnerHTML={{ __html: courseData.description }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CourseDetails;
