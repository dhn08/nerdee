import React, { useEffect, useState } from "react";
import client from "../../../utils/client";
import {
  courseSectionsDetailQuery,
  findUserQuery,
} from "../../../utils/queries";
import WatchLayout from "../../../components/layouts/WatchLayout";
import WatchArea from "../../../components/courses/study/WatchArea";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import CommentArea from "../../../components/courses/study/CommentArea";
const course_uuid = ({ data }) => {
  const [comments, setComments] = useState(data.comment);
  console.log("Han bhai dara:", data);
  const [title, setTitle] = useState(data.title || []);

  return (
    <WatchLayout title={title}>
      <WatchArea sections={data.course_sections} />
      <CommentArea comments={comments} setComment={setComments} />
    </WatchLayout>
  );
};

export const getServerSideProps = async ({
  req,
  res,
  query: { course_uuid },
}) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session) {
    const q2 = findUserQuery(session.user.email);
    const userData = await client.fetch(q2);
    let tempC = userData.courses;
    let userCourses = [];
    tempC?.map((item) => {
      userCourses.push(item._id);
    });

    // console.log("userCourses", userCourses);
    // console.log("course_uuid", course_uuid);
    // console.log("resu:", !userCourses.includes(course_uuid));
    if (!userCourses.includes(course_uuid)) {
      console.log("andar hun");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    // console.log("id:", userCourses);
    // userCourses = session.user.courses;
  }
  const q1 = courseSectionsDetailQuery(course_uuid);
  const data = await client.fetch(q1);
  console.log("section data:", data);
  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default course_uuid;
