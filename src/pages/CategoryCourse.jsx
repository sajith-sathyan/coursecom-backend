import React, { useState } from 'react'
import CoursesItem from '../components/CoursesItem';


const DUMMY_COURSE = [
  {
    id: 1,
    thumbnail:
      "https://t4.ftcdn.net/jpg/05/62/02/41/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg",
    category: "Programming",
    title: "Introduction to JavaScript Introduction to JavaScript",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 101,
  },
  {
    id: 2,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfHyHPe3c3gJ7RQhDRGG5zeLQmIpvT1XoraelfcI0Rqg&s",
    category: "Business",
    title: "Entrepreneurship 101 Entrepreneurship 101",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 102,
  },
  {
    id: 3,
    thumbnail:
      "https://m.economictimes.com/thumb/msid-106330918,width-1200,height-900,resizemode-4,imgsize-151480/avatar-the-last-airbender-    see-latest-series-release-date-plot-cast-and-all-offerings-of-franchise.jpg",
    category: "Design",
    title: "Graphic Design Essentials Graphic Design Essentials",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 103,
  },
  {
    id: 4,
    thumbnail:
      "https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg",
    category: "Health & Fitness",
    title: "Yoga for Beginners Yoga for Beginners   ",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 104,
  },
  {
    id: 1,
    thumbnail:
      "https://t4.ftcdn.net/jpg/05/62/02/41/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg",
    category: "Programming",
    title: "Introduction to JavaScript Introduction to JavaScript",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 101,
  },
  {
    id: 2,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfHyHPe3c3gJ7RQhDRGG5zeLQmIpvT1XoraelfcI0Rqg&s",
    category: "Business",
    title: "Entrepreneurship 101 Entrepreneurship 101",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 102,
  },
  {
    id: 3,
    thumbnail:
      "https://m.economictimes.com/thumb/msid-106330918,width-1200,height-900,resizemode-4,imgsize-151480/avatar-the-last-airbender-    see-latest-series-release-date-plot-cast-and-all-offerings-of-franchise.jpg",
    category: "Design",
    title: "Graphic Design Essentials Graphic Design Essentials",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 103,
  },
  {
    id: 4,
    thumbnail:
      "https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg",
    category: "Health & Fitness",
    title: "Yoga for Beginners Yoga for Beginners   ",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 104,
  },{
    id: 1,
    thumbnail:
      "https://t4.ftcdn.net/jpg/05/62/02/41/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg",
    category: "Programming",
    title: "Introduction to JavaScript Introduction to JavaScript",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 101,
  },
  {
    id: 2,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfHyHPe3c3gJ7RQhDRGG5zeLQmIpvT1XoraelfcI0Rqg&s",
    category: "Business",
    title: "Entrepreneurship 101 Entrepreneurship 101",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 102,
  },
  {
    id: 3,
    thumbnail:
      "https://m.economictimes.com/thumb/msid-106330918,width-1200,height-900,resizemode-4,imgsize-151480/avatar-the-last-airbender-    see-latest-series-release-date-plot-cast-and-all-offerings-of-franchise.jpg",
    category: "Design",
    title: "Graphic Design Essentials Graphic Design Essentials",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 103,
  },
  {
    id: 4,
    thumbnail:
      "https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg",
    category: "Health & Fitness",
    title: "Yoga for Beginners Yoga for Beginners   ",
    description:
      "your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Start your journey to health and wellness with yoga.Learn the basics of JavaScript programming language.",
    authorID: 104,
  },
];
function CategoryCourse() {
  const [courses, setCourses] = useState(DUMMY_COURSE);

  return (
    <section className="author-posts">
    {courses.length >0 ?<div className="container posts__container">
      {courses.map(
        ({ id, thumbnail, category, title, description, authorID }) => (
          <CoursesItem
            key={id}
            postID={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            description={description}
            authorID={authorID}
          />
        )
      )}
    </div>:<h2 className="center">No Course Found</h2>}
  </section>
  )
}

export default CategoryCourse