import React, { useEffect, useState } from "react";
import UserCard from "../components/admin/UserCard";
import Main from "../components/layouts/Main";
import client from "../utils/client";
import { authOptions } from "./api/auth/[...nextauth]";
import { tempTeacherDetailQuery } from "../utils/queries";
import { unstable_getServerSession } from "next-auth";
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
const Admin = ({ userData }) => {
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

export default Admin;
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  // console.log("Admin se ", session);
  if (!session || session.user?.role !== "Admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const q1 = tempTeacherDetailQuery();
  const userData = await client.fetch(q1);

  return {
    props: { userData }, // will be passed to the page component as props
  };
}
