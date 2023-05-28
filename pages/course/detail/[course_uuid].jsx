import React from "react";
import Banner from "../../../components/courses/detail/Banner";
import Description from "../../../components/courses/detail/Description";
import WhatLearnt from "../../../components/courses/detail/WhatLearnt";
import Main from "../../../components/layouts/Main";
import client from "../../../utils/client";
import { courseDetailQuery } from "../../../utils/queries";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { findUserQuery } from "../../../utils/queries";
import CourseDetail from "../../../components/courses/detail/CourseDetail";
import Feedback from "../../../components/courses/detail/Feedback";

const course_uuid = ({ courses, userCourses }) => {
  return (
    <Main>
      <Banner data={courses} userCourses={userCourses} />
      <WhatLearnt />
      <CourseDetail sections={courses.course_sections} />
      <Description info={courses.description} />
      <Feedback comments={courses.comment} />
    </Main>
  );
};

export default course_uuid;
export async function getServerSideProps({ query: { course_uuid }, res, req }) {
  const q1 = courseDetailQuery(course_uuid);
  const courses = await client.fetch(q1);

  //Insuring fresh data for user after checkout as course array in user is updated.
  let userCourses = [];
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const q2 = findUserQuery(session.user.email);
    const userData = await client.fetch(q2);
    let tempC = userData.courses;
    tempC?.map((item) => {
      userCourses.push(item._id);
    });
    // console.log("id:", userCourses);
    // userCourses = session.user.courses;
  }

  return {
    props: { courses, userCourses }, // will be passed to the page component as props
  };
}
