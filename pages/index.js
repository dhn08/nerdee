import Head from "next/head";
import CategoryList from "../components/index/CategoryList";
import CourseList from "../components/index/CourseList";
import CourseSuggest from "../components/index/CourseSuggest";
import Header from "../components/index/Header";
import TeachUdemy from "../components/index/TeachUdemy";
import TrustedCompaies from "../components/index/TrustedCompaies";
import Main from "../components/layouts/Main";
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
      },
    ],
  },
];
const courses = [
  {
    course_uuid: 1,
    sector_name: "Machine Learning",
    image_url:
      "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-thisisengineering-3861964_p7npcl",
    title: "Machine learning for absolute beginners",
    author: { name: "otcheredev" },
    price: 9,
  },
  {
    course_uuid: 2,
    sector_name: "Javascript",
    image_url:
      "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-tima-miroshnichenko-6860464_r9ms9x",
    title: "Vuejs Mastery",
    author: { name: "oliver" },
    price: 12,
  },
  {
    course_uuid: 3,
    sector_name: "Python",
    image_url:
      "https://res.cloudinary.com/otcheredev/image/upload/v1/udemy_app/media/course_images/pexels-thisisengineering-3861964_p7npcl",
    title: "2021 Complete Python Bootcamp With OtchereDev",
    author: { name: "otcheredev" },
    price: 15,
  },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nerdee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header />
        <CourseSuggest sectors={sectors} courses={courses} />
        <CourseList data={courses} />
        <CategoryList sectors={sectors} />
        <TrustedCompaies />
        <TeachUdemy />
      </Main>
    </div>
  );
}
