import React from "react";
import CourseContentItem from "./CourseContentItem";
const CourseContentList = ({ hidden, data }) => {
  return (
    <div className={hidden ? "hidden" : ""}>
      {data?.map((episode, index) => (
        <CourseContentItem data={episode} key={index} />
      ))}
    </div>
  );
};

export default CourseContentList;
