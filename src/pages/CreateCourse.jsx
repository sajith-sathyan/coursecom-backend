import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AiOutlineDelete } from "react-icons/ai";
import { storage } from "../Service/firebase";
import {
  axiosInstance,
  baseURL,
  categoryRoutes,
  courseRoutes,
  userRoutes,
} from "../api/api";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import updatePageVisit from "../Helper/AnalyticsService";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];


const SortableVideo = ({ video, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: video.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(video.id);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        key={video.id}
        className="flex drop__down-card"
      >
        <div>{video.name}</div>
        <button onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
      </div>
      <br />
    </>
  );
};

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailImgeStatus, setThumbnailImgeStatus] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [uploadPrograss, setUploadPrograss] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [userDatas, setUserDatas] = useState([]);
  const Navigate = useNavigate();
  
  const userData = Cookies.get("userData");
  const userID = userData ? JSON.parse(userData)._id : null;

  const handleError = (
    title,
    price,
    category,
    description,
    thumbnailUrl,
    
    videos
  ) => {
    if (!title.length) {
      setError("title filed is empty");
    } else if (!category.length) {
      setError("category filed is empty");
    } else if (!description.length) {
      setError("description filed is empty");
    } else if (!thumbnailUrl.length) {
      setError("thumbnail image filed is empty");
    } else if (!price.length) {
      setError("price  filed is empty");
    } else if (!videos.length) {
      setError("upload videos is empty");
    } else {
      setError("");
    }
  };

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      console.log("thumbnail-->", thumbnail);
      if (!thumbnail) {
        setError("This thumbnail Image not valid change another one");
        reject("No thumbnail selected");
        return;
      }

      const uploadTask = storage
        .ref(`/thumbnails/${thumbnail.name}`)
        .put(thumbnail);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploadPrograss(progress.toFixed(0));
        },
        (error) => {
          console.error("Error uploading thumbnail:", error);
          reject(error);
        },
        () => {
          // Completion function
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              if (url) {
                console.log("Thumbnail URL:", url);
                setThumbnailUrl(url);
                resolve(url);
              } else {
                console.error("Thumbnail URL is undefined");
                reject("Thumbnail URL is undefined");
              }
            })
            .catch((error) => {
              console.error("Error getting thumbnail URL:", error);
              reject(error);
            });
        }
      );
    });
  };

  const uploadVideo = () => {
    return new Promise((resolve, reject) => {
      if (!videoFile) {
        setError("No video selected");
        reject("No video selected");
        return;
      }

      const uploadTask = storage
        .ref(`/videos/${videoFile.name}`)
        .put(videoFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress == 100) {
            setError("");
          }
          setUploadPrograss(progress.toFixed(0));
        },
        (error) => {
          console.error("Error uploading video:", error);
          reject(error);
        },
        () => {
          // Completion function
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              if (url) {
                console.log("Video URL:", url);
                setVideoUrl(url);
                setError("");
                resolve(url);
              } else {
                console.error("Video URL is undefined");
                reject("Video URL is undefined");
              }
            })
            .catch((error) => {
              console.error("Error getting video URL:", error);
              reject(error);
            });
        }
      );
    });
  };

  const addVideo = async (e) => {
    e.preventDefault();

    try {
      if (!videoTitle) {
        setError("Add your video title ");
        return;
      }

      if (videoFile == null) {
        setError("Add your video ");
        return;
      } else {
        const videoUrl = await uploadVideo();
        const newVideo = {
          id: Date.now().toString(),
          name: videoTitle,
          url: videoUrl,
        };

        // Add the new video to the videos array
        setVideos((prevVideos) => [...prevVideos, newVideo]);
        setVideoTitle("");
      }
    } catch (error) {
      setError(error);
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    // Add defensive checks to ensure active and over are not null or undefined
    if (!active || !over || !active.id || !over.id) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    setVideos((videos) => {
      const oldIndex = videos.findIndex((video) => video.id === active.id);
      const newIndex = videos.findIndex((video) => video.id === over.id);
      return arrayMove(videos, oldIndex, newIndex);
    });
  };

  const onDelete = (id, e) => {
    e.preventDefault();
    console.log("Delete video with ID:", id);
    // Filter out the video with the matching ID
    const updatedVideos = videos.filter((video) => video.id !== id);
    // Update the state with the filtered array
    setVideos(updatedVideos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formError = handleError(
      title,
      price,
      category,
      description,
      thumbnailUrl,
      videos,
    
    );
    console.log(title, price, category, description, thumbnailUrl);
    if (formError) {
      setError(formError);
      return;
    }

    const responce = sendToDatabase(
      title,
      price,
      category,
      description,
      thumbnailUrl,
      videos,
     
    );
    console.log(responce);
    if (responce) {
      Navigate(`/mycourse/${userID}`);
    }

  };
  const sendToDatabase = async (
    title,
    price,
    category,
    description,
    thumbnailUrl,
    videos,
    status
  ) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}${courseRoutes}/course`,
        {
          title,
          price,
          category,
          description,
          thumbnailUrl,
          videos,
          userId: userID,
          status: true 
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUser = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}${userRoutes}/user`);
      setUserDatas(res.data); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  const getCategory = async () => {
    try {
      const res = await axiosInstance.get(
        `${baseURL}${categoryRoutes}/category`
      );
      console.log(res.data);
      setCategoryList(res.data[0].CategoryArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
    updatePageVisit('Create Course')
  }, []);
  return (
    <>
      <Header />
      <section className="create-post">
        <div className="container">
          <h2>Create Course</h2>
          {error && <p className="form__error-message">{error}</p>}
          {uploadPrograss !== null && (
            <p className="form__error-success">
              {uploadPrograss !== 100
                ? `${uploadPrograss}% upload completed`
                : thumbnailImgeStatus}
            </p>
          )}
          <div className="form create-post__form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPrice(value);
              }}
              pattern="[0-9]*" // Only allows input of numbers
            />
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryList.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <ReactQuill
              modules={modules}
              formats={formats}
              value={description}
              onChange={setDescription}
            />

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setThumbnail(file);
                if (file) {
                  console.log("Thumbnail selected:", file);
                  setThumbnail(file);
                  uploadImage()
                    .then((url) => {
                      console.log("Thumbnail URL:", url);
                      setError("");
                      setThumbnailImgeStatus("image uploded successfully");
                      setError("");
                    })
                    .catch((error) => {
                      console.error("Error uploading thumbnail:", error);
                    });
                } else {
                  console.error("This thumbnail selected");
                }
              }}
              accept="image/*"
            />

            <small>Add the thumbnail image</small>
            {/* <button type="submit" className="btn primary">
                    Create
                  </button> */}
            <br />
            <div className="form create-post__form">
              <input
                type="text"
                value={videoTitle}
                placeholder="Enter video title"
                onChange={(e) => setVideoTitle(e.target.value)}
                accept="video/*"
              />

              <div className="input-container">
                <input
                  type="file"
                  placeholder="Enter video title"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
                <small>Add your course video</small>
                <button
                  type="button"
                  className="btn primary"
                  onClick={addVideo}
                >
                  Add
                </button>
              </div>

              <div>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={onDragEnd}
                >
                  <SortableContext
                    items={videos}
                    strategy={verticalListSortingStrategy}
                  >
                    {videos.map((video) => (
                      <div key={video.id} className="">
                        <SortableVideo
                          key={video.id}
                          video={video}
                          onDelete={(id, e) => onDelete(id, e)}
                        />
                      </div>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} className="btn primary">
            create
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CreateCourse;
