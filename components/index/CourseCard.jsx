import Link from "next/link";
import React from "react";
import { urlFor } from "../../utils/client";

const CourseCard = ({ data }) => {
  return (
    <Link href={`/course/detail/${data._id}`}>
      <div className="w-60  md:w-56 cursor-pointer m-2 flex md:block">
        <div className="w-4/12 md:w-full h-16 overflow-hidden md:h-40 border rounded-md">
          <img
            src={urlFor(data.image)}
            className="w-full h-full"
            alt="course_card_img"
          />
        </div>

        <div className="flex flex-col ml-2 md:ml-0 md:p-2">
          <h3 className="font-semibold text-sm md:text-base">
            {/* Machine Learning A-Z™: Hands-On Python & R In Data... */}
            {data.title.length > 60
              ? data.title.slice(0, 59) + "..."
              : data.title}
          </h3>
          <h5 className="text-xs ">
            {/* OtchereDev */}
            By{" "}
            {data.authorlength > 10
              ? data.author.slice(0, 9) + "..."
              : data.author}
          </h5>
          {/* <h3 className="text-xs text-yellow-500 my-1">
            <span className="font-semibold mr-3">rating: {data.rating}</span> (
            {data.student_no})
          </h3> */}
          <h3 className="text-base md:text-xl font-bold">₹{data.price}</h3>
          <button className="text-sm w-1/2 py-1 px-2 cursor-auto bg-yellow-500 text-yellow-700 rounded-md">
            Bestseller
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
