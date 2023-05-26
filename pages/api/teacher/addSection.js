import client from "../../../utils/client";
export default async function handler(req, res) {
  const { title, sectionNumber, courseId } = req.body;
  const sectionDoc = {
    _type: "courseSection",
    section_title: title,
    section_number: parseInt(sectionNumber),
  };
  if (req.method === "POST") {
    try {
      // console.log("Han bhai inside add api");
      // console.log("courseIds: ", courseIds);
      // console.log("courseIds type: ", typeof courseIds);

      // console.log("userId: ", userId);
      const newlyAddedSection = await client.create(sectionDoc);

      await client
        .patch(courseId)
        // Ensure that the `reviews` arrays exists before attempting to add items to it
        .setIfMissing({ course_sections: [] })
        // Add the items after the last item in the array (append)
        .insert("after", "course_sections[-1]", [
          { _type: "reference", _ref: newlyAddedSection._id },
        ])
        .commit({
          // Adds a `_key` attribute to array items, unique within the array, to
          // ensure it can be addressed uniquely in a real-time collaboration context
          autoGenerateArrayKeys: true,
        });
      res.status(200).json({ msg: "section added" });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
