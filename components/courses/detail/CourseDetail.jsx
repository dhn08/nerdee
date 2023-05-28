import React from "react";
import CourseContentSec from "./CourseContentSec";
import formatTime from "../../../utils/formatTime";
const CourseDetail = ({ sections }) => {
  let total_lectures = 0;
  let total_length = 0;
  sections.map((section) => {
    total_lectures += section.episodes.length;
    section.episodes.map((ep) => (total_length += ep.duration));
  });
  return (
    <section className="w-full flex justify-center py-10">
      <div className="w-11/12 md:w-10/12 lg:w-8/12">
        <h2 className="text-xl md:text-2xl text-gray-800 font-semibold mb-2">
          Course Content
        </h2>
        <ul className="flex w-full space-x-3 text-sm md:text-base">
          <li className="mr-1 inline-block">{sections.length} sections</li>
          <li className="mr-1  inline-block">• {total_lectures} lectures</li>
          <li className="mr-1  inline-block">
            {`• ${formatTime(total_length)} total length`}
          </li>
        </ul>
        <div className="my-4">
          {sections.map((section, index) => (
            <CourseContentSec section={section} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
