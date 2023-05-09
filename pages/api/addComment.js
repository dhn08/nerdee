import { unstable_getServerSession } from "next-auth";
import client from "../../utils/client";
import { authOptions } from "../api/auth/[...nextauth]";
import { getCommentQuery } from "../../utils/queries";
export default async function handler(req, res) {
  const { courseId, message } = req.body;
  console.log(courseId, message);
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log("Api session:", session);
  if (!session) {
    return res.status(201).json("You or not logged in !!");
  }
  const newCommentDoc = {
    _type: "comment",
    user: {
      _type: "reference",
      _ref: session.user?._id, // the ID of the user who wrote the comment
    },
    message,
  };

  if (req.method === "POST") {
    const { _id: commentId } = await client.create(newCommentDoc);
    const r = await client
      .patch(courseId)
      // Ensure that the `reviews` arrays exists before attempting to add items to it
      .setIfMissing({ comment: [] })
      // Add the items after the last item in the array (append)
      .insert("after", "comment[-1]", [{ _type: "reference", _ref: commentId }])
      .commit({
        // Adds a `_key` attribute to array items, unique within the array, to
        // ensure it can be addressed uniquely in a real-time collaboration context
        autoGenerateArrayKeys: true,
      });
    const q1 = getCommentQuery(commentId);
    const newComment = await client.fetch(q1);
    res.status(200).json(newComment);
    try {
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
