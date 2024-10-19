import React, { useState } from "react";
import CoursesItem from "./CoursesItem";

function Courses({ courses }) {


  return (
    <section className="posts">
      {courses.length > 0 ? (
        <div className="container posts__container">
          {courses.map(
            ({ _id, thumbnailUrl, category, title, description, authorID }) => (
              <CoursesItem
                key={_id}
                postID={_id}
                thumbnail={thumbnailUrl}
                category={category}
                title={title}
                description={description} 
                authorID={authorID}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No Course Found</h2>
      )}
    </section>
  );
}

export default Courses;
