import Link from "next/link";
import React from "react";
import { urlFor } from "../../utils/client";
const CourseItem = ({ course }) => {
  // console.log(urlFor(course.image));
  return (
    <Link href={"course/study/" + course._id}>
      <div className="w-full flex cursor-pointer border-b pb-3 mt-2">
        <div className="w-3/12 overflow-hidden h-14 md:h-20 lg:h-40  border rounded-md mr-5">
          <img
            src={urlFor(course.image)}
            className="w-full h-full"
            alt="course_card_img"
          />
        </div>

        <div className="w-8/12">
          <h3 className="font-semibold text-sm md:text-base">{course.title}</h3>

          <h5 className="text-xs  text-gray-400">{course.author.name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
