import React from "react";
import MainTeacher from "../../components/layouts/MainTeacher";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { findUserQuery } from "../../utils/queries";
import client from "../../utils/client";
import Link from "next/link";
import { useRouter } from "next/router";
import CourseItem from "../../components/teacher/CourseItem";

const Index = ({ courseDetail }) => {
  const router = useRouter();
  return (
    <MainTeacher>
      <section className="w-full flex flex-col space-y-4 py-14 md:py-20 bg-gray-900 pl-10">
        <h2 className="text-2xl md:text-3xl text-gray-100 font-medium">
          Your Courses
        </h2>
        <div className="w-1/2">
          <button
            onClick={() => router.push("/teacher/AddCourse")}
            className="text-sm  py-1 px-2 lg:text-base  lg:py-2 rounded-md md:px-5 border bg-blue-400  font-semibold text-white"
          >
            Add Course
          </button>
        </div>
      </section>

      <section className="w-full flex justify-between pt-12 px-10  mb-20">
        <div className="w-11/12 md:w-8/12 mx-auto">
          <h3 className="text-lg my-2">{courseDetail?.length} Course</h3>

          {courseDetail?.length > 0 ? (
            courseDetail.map((item, index) => {
              return <CourseItem key={index} course={item} />;
            })
          ) : (
            <h3 className="md:text-lg text-center"> You have no courses yet</h3>
          )}
        </div>
      </section>
    </MainTeacher>
  );
};

export default Index;
export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (session.user.role !== "Teacher") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  //console.log("User se :", session);
  const query = findUserQuery(session.user.email);
  const user = await client.fetch(query);
  // console.log(user);
  const courseDetail = user.courses;

  return {
    props: { courseDetail },
  };
};
