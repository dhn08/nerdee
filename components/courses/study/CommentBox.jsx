import axios from "axios";
import { useRouter } from "next/router";
import { comment } from "postcss";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";

function CommentBox({ setComment, comments }) {
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { course_uuid } = router.query;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // const payload = {
    //   course_uuid,
    //   message,
    // };
    // TODO: post comment to API
    // const res = await fetch(`${NEXT_BACKEND_URI}/addComment/`, {
    //   method: "POST",
    //   body: JSON.stringify({ data: { message }, course_uuid }),
    // });
    // console.log(process.env.HOST);
    const res = await axios.post("http://localhost:3000/api/addComment", {
      courseId: course_uuid,
      message,
    });
    console.log("res", res);
    // console.log(res.ok,(await res).status)
    if (res.status !== 200) {
      toast.error("could not add your comment");
    } else {
      toast.success("comment added");
      // console.log("Yahan se:", comments);
      if (!comment) {
        setComment[res.data];
      } else {
        setComment([...comments, res.data]);
      }

      setMessage("");
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-center text-xl md:text-2xl font-medium mb-4">
        Leave A Comment
      </h2>
      <form className="w-11/12 md:w-9/12 mx-auto">
        <textarea
          value={message}
          onChange={handleChange}
          placeholder="Leave a comment "
          className="w-full h-52 outline-none border text-sm md:text-base p-3 resize-none rounded-md"
        ></textarea>
        <button
          type="button"
          onClick={handleClick}
          className="py-2 rounded-md px-5 border bg-blue-500 font-semibold text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentBox;
