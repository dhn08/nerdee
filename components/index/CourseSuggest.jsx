import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { useRouter } from "next/router";
import { CourseSuggestChangeBtn } from "./CourseSuggestChangeBtn";
const CourseSuggest = ({ sectors, courses }) => {
  const [suggest, setSuggest] = useState(sectors[0].sector_name);
  const [sectorId, setsectorId] = useState(sectors[0]._id);
  const [suggestedCourse, setSuggestedCourse] = useState(
    sectors.find((sector) => sector.sector_name == suggest).featured_courses
  );

  const router = useRouter();
  useEffect(() => {
    setSuggestedCourse(
      sectors.find((sector) => sector.sector_name == suggest).featured_courses
    );
    setsectorId(sectors.find((sector) => sector.sector_name == suggest)._id);
  }, [suggest]);
  return (
    <section className="pt-12 md:pt-16 bg-white px-5 md:px-10">
      <h3 className="text-xl md:text-2xl font-semibold mb-2">
        The world's largest selection of courses
      </h3>
      <h4 className="text-sm md:text-lg text-gray-400 mb-8">
        Choose from 155,000 online video courses with new additions published
        every month
      </h4>
      <div>
        <div>
          {sectors.map((sector) => (
            <CourseSuggestChangeBtn
              key={sector.sector_name}
              name={sector.sector_name}
              setSuggest={setSuggest}
            />
          ))}
        </div>
        <div className="border py-5 px-3 w-full rounded-md my-4">
          <div className="flex items-center justify-between py-7">
            <div className="md:w-10/12 lg:w-6/12">
              <h3 className="text-lg md:text-2xl font-semibold mb-3">
                Lead data-driven decisions with Data Science
              </h3>
              <p className="text-sm md:text-lg mb-3">
                Data science is everywhere. Better data science practices are
                allowing corporations to cut unnecessary costs, automate
                computing, and analyze markets. Essentially, data science is the
                key to getting ahead in a competitive global climate.
              </p>
              <button
                onClick={() => router.push(`/course/sector/${sectorId}`)}
                className="py-2 rounded-md px-3 text-sm md:text-base md:px-5 border bg-blue-500 font-semibold text-white"
              >
                Explore{" "}
                {suggest[0].toUpperCase() + suggest.slice(1, suggest.length)}
              </button>
            </div>
            <div className="hidden md:w-2/12 lg:flex justify-center items-center">
              <div className="h-32 w-32 overflow-hidden flex justify-center items-center bg-black rounded-full">
                <img
                  src="https://res.cloudinary.com/dplljbrim/image/upload/v1667643267/neerdee/pexels-louis_bt5eor.jpg"
                  className="w-full h-full"
                  alt="sector_image"
                />
              </div>
            </div>
          </div>

          <div className="my-4 flex flex-col flex-wrap md:flex-row">
            {suggestedCourse.length ? (
              suggestedCourse.map((course, index) => (
                <CourseCard key={index} data={course} />
              ))
            ) : (
              <CourseCard />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSuggest;
