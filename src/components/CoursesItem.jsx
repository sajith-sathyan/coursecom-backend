import React from 'react';
import { Link } from 'react-router-dom';
import CourseAuthor from './CourseAuthor';
import { BiLike } from "react-icons/bi";

function CoursesItem({ postID, id, thumbnail, category, title, description, authorID }) {
    // Remove HTML tags from description
    const cleanDescription = description.replace(/(<([^>]+)>)/gi, "");

    // Display only the first 100 characters of the cleaned description
    const shortDescription = cleanDescription.length > 100 ? cleanDescription.substr(0, 100) + "..." : cleanDescription;
    const shortTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;

    return (
        <article className='post'>
            <div className='post__thumbnail'>
                <img src={thumbnail} alt={title} />
            </div>
            <div className='post__content'>
                {/* <div className='post_like'>
                    <BiLike className="like-icon" /> 
                </div> */}

                <Link to={`/course/${postID}`}>
                    <h3>{shortTitle}</h3>
                    <p>{shortDescription}</p>
                </Link>

                <div className="post__footer">
                    <CourseAuthor />
                    <Link to={`/course/categories/${category}`} className='btn category'>{category}</Link>
                </div>
            </div>
        </article>
    )
}

export default CoursesItem;
