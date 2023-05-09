import React, { useState } from "react";
import client from "../../../utils/client";
import { courseSectionsDetailQuery } from "../../../utils/queries";
import WatchLayout from "../../../components/layouts/WatchLayout";
import WatchArea from "../../../components/courses/study/WatchArea";
// import { unstable_getServerSession } from "next-auth";
// import { authOptions } from "../../api/auth/[...nextauth]";
const course_uuid = ({ data }) => {
  //   const [comments, setComments] = useState(data.comment);
  console.log("Han bhai dara:", data);
  const [title, setTitle] = useState(data.title);
  return (
    <WatchLayout title={title}>
      <WatchArea sections={data.course_sections} />
      {/* <CommentArea comments={comments} setComment={setComments} /> */}
    </WatchLayout>
  );
};

export const getServerSideProps = async ({
  req,
  res,
  query: { course_uuid },
}) => {
  //   const session = await unstable_getServerSession(req, res, authOptions);
  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/",
  //         permanent: false,
  //       },
  //     };
  //   }
  const q1 = courseSectionsDetailQuery(course_uuid);
  const data = await client.fetch(q1);
  console.log("section data:", data);
  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default course_uuid;
