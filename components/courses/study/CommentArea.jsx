import React, { useState } from "react";
import CommentMsg from "../commentMsg";
import CommentBox from "./CommentBox";

function CommentArea({ comments, setComment }) {
  return (
    <section className="w-full flex justify-center py-10">
      <div className="w-11/12 md:w-10/12 lg:w-8/12">
        <h2 className="text-center  text-2xl font-semibold mb-4">Comments</h2>

        {comments.map((comment, index) => {
          let colors = ["red", "blue", "yellow", "pink"];
          let color = colors[Math.floor(Math.random() * 4)];

          console.log("Inside map:", color);
          return <CommentMsg key={index} color={color} comment={comment} />;
        })}

        <CommentBox comments={comments} setComment={setComment} />
      </div>
    </section>
  );
}

export default CommentArea;
