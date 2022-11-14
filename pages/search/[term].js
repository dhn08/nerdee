import { useRouter } from "next/router";
import React from "react";
import CourseListCard from "../../components/courses/list/CourseListCard";
import Main from "../../components/layouts/Main";
import client from "../../utils/client";
import { searchCourseQuery } from "../../utils/queries";

const term = ({ data }) => {
  const router = useRouter();
  const {
    query: { term },
  } = router;
  return (
    <Main>
      <section className="w-full py-20 bg-gray-900 pl-10 mb-5">
        <h2 className="text-3xl text-gray-100 font-medium">
          Courses on terms "{term}"
        </h2>
      </section>
      {data && data.length ? (
        <section className="my-5 px-8 mb-20">
          {data.map((course) => (
            <CourseListCard data={course} key={course._id} />
          ))}
        </section>
      ) : (
        <section className="mb-20">
          <h3 className="text-2xl my-5 text-center">
            No Course found on the provided term "{term}"
          </h3>
        </section>
      )}
    </Main>
  );
};

export default term;
export async function getServerSideProps({ query: { term } }) {
  const q1 = searchCourseQuery(term);
  const data = await client.fetch(q1);

  return {
    props: { data }, // will be passed to the page component as props
  };
}
