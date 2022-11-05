import React from "react";
import CourseListCard from "../../../components/courses/list/CourseListCard";
import Main from "../../../components/layouts/Main";

const sector_uuid = ({ data: { sector_name, featured_courses } }) => {
  return (
    <Main>
      <section className="py-10 px-8 ">
        <h1 className="my-4 text-2xl md:text-3xl font-bold">
          {sector_name[0].toUpperCase() +
            sector_name.slice(1, sector_name.length)}{" "}
          Courses
        </h1>

        <h3 className="md:text-lg flex items-center ">
          <span className="text-xl mr-1 flex items-center">
            <ion-icon name="people"></ion-icon>
          </span>{" "}
          35 learners
        </h3>
      </section>
      <section className="my-5 px-8">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
          All{" "}
          {sector_name[0].toUpperCase() +
            sector_name.slice(1, sector_name.length)}{" "}
          Courses
        </h1>
        <h4 className="text-sm  md:text-lg md:w-9/12 lg:w-6/12">
          {sector_name[0].toUpperCase() +
            sector_name.slice(1, sector_name.length)}{" "}
          instructors on Udemy specialize in everything from software
          development to data analysis, and are known for their effective,
          friendly instruction for students of all levels.
        </h4>

        <div className=" flex items-center py-3 px-2 bg-gray-200 border border-gray-400 rounded-sm my-4">
          <div className=" flex items-center justify-center text-2xl mr-3 text-indigo-800">
            <ion-icon name="information-circle"></ion-icon>
          </div>
          <h3 className="text-sm md:text-base lg:text-lg">
            Not sure? All courses have a 30-day money-back guarantee
          </h3>
        </div>
      </section>
      <section className="my-5 px-8 mb-20">
        {featured_courses.map((course) => (
          <CourseListCard data={course} key={course.course_uuid} />
        ))}
      </section>
    </Main>
  );
};

export default sector_uuid;

export async function getServerSideProps({ query: { sector_uuid } }) {
  const sectors = [
    {
      sector_uuid: 1,
      sector_name: "Python",
      sector_image:
        "https://res.cloudinary.com/dplljbrim/image/upload/v1663528167/neerdee/pexels-christina-morillo-1181671_zkbwz9_m9myeo.jpg",
      featured_courses: [
        {
          course_uuid: 3,
          sector_name: "Python",
          image_url:
            "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-thisisengineering-3861964_p7npcl",
          title: "2021 Complete Python Bootcamp With OtchereDev",
          author: { name: "otcheredev" },
          description:
            "Become a Python Programmer and learn one of employer's most requested skills of 2021! This is the most comprehensive, yet straight-forward, course for the Python programming language on Udemy! Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will teach you Python 3. With over 100 lectures and more than 21 hours of video this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio! Learn how to use Python for real-world tasks, such as working with PDF Files, sending emails, reading Excel files, Scraping websites for informations, working with image files, and much more! This course will teach you Python in a practical manner, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you! We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we've got you covered.",
          price: 15,
        },
      ],
    },

    {
      sector_uuid: 2,
      sector_name: "Javascript",
      sector_image:
        "https://res.cloudinary.com/dplljbrim/image/upload/v1663528167/neerdee/pexels-jorge-jesus-614117_mu3ukg_ynobni.jpg",
      featured_courses: [
        {
          course_uuid: 2,
          sector_name: "Javascript",
          image_url:
            "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-tima-miroshnichenko-6860464_r9ms9x",
          title: "Vuejs Mastery",
          description:
            "No matter at which metric you look at (Google Trends, Github Stars, Tweets ...) - VueJS is the shooting star in the world of JavaScript frameworks - it simply is amazing! This bestselling course teaches the latest version of Vue (Vue.js 3) from the ground up and in great detail. We'll cover all the core basics but we'll not stop thereafter - this course also dives into advanced concepts like the Composition API introduced with Vue 3. Frontend frameworks like Vue JS are extremely popular because they give us this reactive, great user experience we know from mobile apps - but now in the browser! No wonder that jobs requiring frontend framework skills like VueJS are amongst the best paid ones in the industry!",
          author: { name: "oliver" },
          price: 12,
        },
      ],
    },
    {
      sector_uuid: 3,
      sector_name: "Machine Learning",
      sector_image:
        "https://res.cloudinary.com/dplljbrim/image/upload/v1663528167/neerdee/pexels-kindel-media-8566473_gpfxc8_z9e0yf.jpg",
      featured_courses: [
        {
          course_uuid: 1,
          sector_name: "Machine Learning",
          image_url:
            "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-thisisengineering-3861964_p7npcl",
          title: "Machine learning for absolute beginners",
          author: { name: "otcheredev" },
          price: 9,
          description:
            "Data scientist is one of the best suited professions to thrive this century. It is digital, programming-oriented, and analytical. Therefore, it comes as no surprise that the demand for data scientists has been surging in the job marketplace. However, supply has been very limited. It is difficult to acquire the skills necessary to be hired as a data scientist. And how can you do that? Universities have been slow at creating specialized data science programs. (not to mention that the ones that exist are very expensive and time consuming)",
        },
      ],
    },
  ];
  const data = sectors.find((sector) => sector.sector_uuid == sector_uuid);

  return {
    props: { data }, // will be passed to the page component as props
  };
}
