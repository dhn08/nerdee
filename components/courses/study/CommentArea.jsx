import React, { useState } from "react";

import CommentBox from "./CommentBox";
import CommentMsg from "../CommentMsg";

function CommentArea({ comments, setComment }) {
  return (
    <section className="w-full flex justify-center py-10">
      <div className="w-11/12 md:w-10/12 lg:w-8/12">
        <h2 className="text-center  text-2xl font-semibold mb-4">Comments</h2>

        {comments?.map((comment, index) => {
          let num = Math.floor(Math.random() * 4);
          return <CommentMsg key={index} num={num} comment={comment} />;
        })}

        <CommentBox comments={comments} setComment={setComment} />
      </div>
    </section>
  );
}

export default CommentArea;
