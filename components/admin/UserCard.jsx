import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import client from "../../utils/client";

const UserCard = ({ userData }) => {
  const router = useRouter();
  const handleApprove = async () => {
    const doc = {
      _type: "user",
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };
    const result = await axios.post(
      "http://localhost:3000/api/adminapprove",
      doc
    );
    router.push("/admin");

    toast(`${result.data}`);
  };
  const handleReject = async () => {
    await axios.post("http://localhost:3000/api/adminreject", userData);
    router.push("/admin");
    toast("teacher rejected");
  };
  return (
    <div className="max-w-md bg-white rounded-lg border border-gray-200 transition duration-300 ease-in-out shadow-md hover:scale-105 cursor-pointer ">
      <div className="flex flex-col w-full items-center pt-5 pb-10 ">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userData.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {`email:${userData.email}`}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {`password:${userData.password}`}
        </span>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleApprove}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Allow
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
