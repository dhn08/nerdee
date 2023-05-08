import React, { useState, useEffect, useContext } from "react";

import CourseItem from "../components/user/courseItem";
import AuthContext from "../context/AuthContext";
import { BACKEND_URI } from "../config/app";
import cookie from "cookie";
import refreshToken from "./api/refresh_token";
import Main from "../components/layouts/Main";
import { authOptions } from "./api/auth/[...nextauth]";

function user() {
  const [courseDetail, setCourseDetail] = useState([]);
  const [courseReady, setCourseReady] = useState(false);

  const {
    user: { courses },
  } = useContext(AuthContext);

  useEffect(async () => {
    if (courses.length > 0) {
      const res = await fetch(`${BACKEND_URI}/courses/cart/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ cart: courses }),
      });

      if (res.ok) {
        const details = await res.json();

        setCourseDetail([...details.cart_detail]);

        setCourseReady(true);
      }
    }
  }, []);

  return (
    <Main>
      <section className="w-full py-14 md:py-20 bg-gray-900 pl-10">
        <h2 className="text-2xl md:text-3xl text-gray-100 font-medium">
          Your Courses
        </h2>
      </section>

      <section className="w-full flex justify-between pt-12 px-10  mb-20">
        <div className="w-11/12 md:w-8/12 mx-auto">
          <h3 className="text-lg my-2">{courses.length} Course</h3>

          {courseDetail.length > 0 && courseReady ? (
            <>
              {courseDetail.length
                ? courses.map((item, index) => {
                    const obj = courseDetail.find(
                      (detail) => item == detail.course_uuid
                    );

                    return <CourseItem key={index} course={obj} />;
                  })
                : ""}
            </>
          ) : (
            <h3 className="md:text-lg text-center"> You have no courses yet</h3>
          )}
        </div>
      </section>
    </Main>
  );
}

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

  return {
    props: {},
  };
};

export default user;
