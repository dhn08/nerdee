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

const course_uuid = ({ courses, userCourses }) => {
  return (
    <Main>
      <Banner data={courses} userCourses={userCourses} />
      <WhatLearnt />
      <Description info={courses.description} />
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

  // const courses = [
  //   {
  //     course_uuid: 1,
  //     sector_name: "Machine Learning",
  //     image_url:
  //       "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-thisisengineering-3861964_p7npcl",
  //     title: "Machine learning for absolute beginners",
  //     author: "otcheredev",
  //     price: 9,
  //     description:
  //       "Data scientist is one of the best suited professions to thrive this century. It is digital, programming-oriented, and analytical. Therefore, it comes as no surprise that the demand for data scientists has been surging in the job marketplace. However, supply has been very limited. It is difficult to acquire the skills necessary to be hired as a data scientist. And how can you do that? Universities have been slow at creating specialized data science programs. (not to mention that the ones that exist are very expensive and time consuming)",
  //   },
  //   {
  //     course_uuid: 2,
  //     sector_name: "Javascript",
  //     image_url:
  //       "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-tima-miroshnichenko-6860464_r9ms9x",
  //     title: "Vuejs Mastery",
  //     author: "oliver",
  //     description:
  //       "No matter at which metric you look at (Google Trends, Github Stars, Tweets ...) - VueJS is the shooting star in the world of JavaScript frameworks - it simply is amazing! This bestselling course teaches the latest version of Vue (Vue.js 3) from the ground up and in great detail. We'll cover all the core basics but we'll not stop thereafter - this course also dives into advanced concepts like the Composition API introduced with Vue 3. Frontend frameworks like Vue JS are extremely popular because they give us this reactive, great user experience we know from mobile apps - but now in the browser! No wonder that jobs requiring frontend framework skills like VueJS are amongst the best paid ones in the industry!",
  //     price: 12,
  //   },
  //   {
  //     course_uuid: 3,
  //     sector_name: "Python",
  //     image_url:
  //       "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-thisisengineering-3861964_p7npcl",
  //     title: "2021 Complete Python Bootcamp With OtchereDev",
  //     author: "otcheredev",
  //     description:
  //       "Become a Python Programmer and learn one of employer's most requested skills of 2021! This is the most comprehensive, yet straight-forward, course for the Python programming language on Udemy! Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will teach you Python 3. With over 100 lectures and more than 21 hours of video this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio! Learn how to use Python for real-world tasks, such as working with PDF Files, sending emails, reading Excel files, Scraping websites for informations, working with image files, and much more! This course will teach you Python in a practical manner, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you! We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we've got you covered.",
  //     price: 15,
  //   },
  // ];
  // const data = courses.find((course) => course.course_uuid == course_uuid);

  return {
    props: { courses, userCourses }, // will be passed to the page component as props
  };
}
