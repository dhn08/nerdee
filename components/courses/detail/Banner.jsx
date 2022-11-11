import React from "react";

const Banner = ({ data }) => {
  return (
    <section className="text-gray-50 bg-gray-800 py-14 px-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold w-11/12 md:w-8/12 mb-2">
        {data.title}
      </h1>
      <h3 className="text-sm md:text-lg md:w-9/12 lg:w-6/12 mb-2">
        {data.description.length > 60
          ? data.description.slice(0, 59) + "..."
          : data.description}
      </h3>
      <div className="mb-2">
        <button className="text-xs md:text-sm py-1 px-2 cursor-auto bg-yellow-500 text-yellow-700 rounded-md">
          Bestseller
        </button>
        {/* <span className=" text-xs md:text-base font-semibold m-3  text-yellow-500">
          {data.rating} rating
        </span>
        <span className="text-xs md:text-base">
          ({data.number_of_rating} ratings) {data.student_no} students
        </span> */}
      </div>
      <p className="mb-2 md:text-base text-xs">
        Created by{" "}
        <span className="text-blue-400 underline">{data.author}</span>
      </p>
      <h2 className="text-xl md:text-2xl font-semibold mb-2">${data.price}</h2>
    </section>
  );
};

export default Banner;
