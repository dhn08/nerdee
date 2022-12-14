import { useRouter } from "next/router";
import React from "react";

const TeachUdemy = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/signupTeacher");
  };
  return (
    <section className="my-5 md:my-10">
      <div className="py-8 md:py-16">
        <div
          className="flex justify-center items-center"
          style={{ height: "320px", backgroundColor: "#fbfbf8" }}
        >
          <div className="flex justify-center w-10/12 md:w-8/12 items-center">
            <img
              src="https://res.cloudinary.com/dplljbrim/image/upload/v1663526859/neerdee/udemy_teacher_ej3csr.jpg"
              className="hidden  lg:block shadow-xl mr-20 rounded-md"
              style={{ width: "400px", height: "400px" }}
              alt="teacher_image"
            />
            <div>
              <h2 className="text-lg md:text-2xl font-semibold my-2">
                Become an instructor
              </h2>
              <p className="text-sm md:text-lg mb-2">
                Top instructors from around the world teach millions of students
                on Nerdee. We provide the tools and skills to teach what you
                love.
              </p>

              <button
                onClick={handleClick}
                className="py-2 text-sm md:text-base rounded-md px-3 md:px-5 border bg-blue-500 font-semibold text-white"
              >
                Start teaching today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachUdemy;
