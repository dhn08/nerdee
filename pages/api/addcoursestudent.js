import client from "../../utils/client";
export default async function handler(req, res) {
  const { courseIds, userId } = req.body;
  console.log("Inside api :", courseIds);
  if (req.method === "POST") {
    try {
      // console.log("Han bhai inside add api");
      // console.log("courseIds: ", courseIds);
      // console.log("courseIds type: ", typeof courseIds);

      // console.log("userId: ", userId);

      // courseIds.map(async (id) => {
      //   await client
      //     .patch(userId)
      //     // Ensure that the `reviews` arrays exists before attempting to add items to it
      //     .setIfMissing({ courses: [] })
      //     // Add the items after the last item in the array (append)
      //     .insert("after", "courses[-1]", [{ _type: "reference", _ref: id }])
      //     .commit({
      //       // Adds a `_key` attribute to array items, unique within the array, to
      //       // ensure it can be addressed uniquely in a real-time collaboration context
      //       autoGenerateArrayKeys: true,
      //     });
      // });

      //Trying promise All
      // await Promise.all(
      //   courseIds.map(async (id) => {
      //     console.log("Insde promise :", id);
      //     await client
      //       .patch(userId)
      //       .setIfMissing({ courses: [] })
      //       .insert("after", "courses[-1]", [{ _type: "reference", _ref: id }])
      //       .commit({
      //         autoGenerateArrayKeys: true,
      //       });
      //   })
      // );
      //chatgot sol
      await client
        .patch(userId)
        .setIfMissing({ courses: [] })
        .set({
          courses: (currentCourses) => [
            ...(currentCourses || []),
            ...courseIds.map((id) => ({ _type: "reference", _ref: id })),
          ],
        })
        .commit({
          autoGenerateArrayKeys: true,
        });
      res.status(200).json("course added");
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
