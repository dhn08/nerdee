import Link from "next/link";
import React from "react";
import { urlFor } from "../../utils/client";
import { TbPlaylistAdd } from "react-icons/tb";
import { RiVideoAddFill } from "react-icons/ri";

const CourseItem = ({ course }) => {
  // console.log(urlFor(course.image));
  return (
    <div className="w-full flex  border-b pb-3 mt-2">
      <div className="w-3/12 overflow-hidden h-14 md:h-20 lg:h-40  border rounded-md mr-5">
        <img
          src={urlFor(course.image)}
          className="w-full h-full"
          alt="course_card_img"
        />
      </div>
      <div className=" w-4/12">
        <h3 className="font-semibold text-sm md:text-base">{course.title}</h3>
      </div>
      <div className="w-5/12 flex items-center justify-center ">
        <Link href={`/teacher/addsection/${course._id}`}>
          <div className="w-1/2 cursor-pointer space-x-1 flex items-center justify-center ">
            <TbPlaylistAdd className="text-2xl" />
            <span className="text-xl">Add Sections</span>
          </div>
        </Link>
        <Link href={`/teacher/addlecture/${course._id}`}>
          <div className="w-1/2 cursor-pointer space-x-1 flex items-center justify-center ">
            <RiVideoAddFill className="text-2xl" />
            <span className="text-xl">Add Lectures</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
