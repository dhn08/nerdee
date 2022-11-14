import React, { useEffect, useState } from "react";
import UserCard from "../components/admin/UserCard";
import Main from "../components/layouts/Main";
import client from "../utils/client";
import { tempTeacherDetailQuery } from "../utils/queries";
// const userData = [
//   {
//     _id: 1,
//     name: "Dhananjay",
//     email: "singhdhananjay.2001",
//     password: "Asasa",
//   },
//   {
//     _id: 2,
//     name: "Dhananjay",
//     email: "singhdhananjay.2001",
//     password: "Asasa",
//   },
//   {
//     _id: 3,
//     name: "Dhananjay",
//     email: "singhdhananjay.2001",
//     password: "Asasa",
//   },
// ];
const admin = ({ userData }) => {
  return (
    <Main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 ml-5">
        {userData.length ? (
          userData.map((user) => <UserCard key={user._id} userData={user} />)
        ) : (
          <h1>No request</h1>
        )}
      </div>
    </Main>
  );
};

export default admin;
export async function getServerSideProps(context) {
  const q1 = tempTeacherDetailQuery();
  const userData = await client.fetch(q1);

  return {
    props: { userData }, // will be passed to the page component as props
  };
}
