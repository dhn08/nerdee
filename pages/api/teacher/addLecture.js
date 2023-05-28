import client from "../../../utils/client";

export default async function handler(req, res) {
  const { selectedOption, vedioData, title, videoDuration } = req.body;
  const sectionId = selectedOption;
  const episodeDoc = {
    _type: "episode",
    title,
    file: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: vedioData._id, // Replace with the asset ID of the uploaded video
      },
    },
    duration: { videoDuration },
  };
  if (req.method === "POST") {
    try {
      // console.log("Han bhai inside add api");
      // console.log("courseIds: ", courseIds);
      // console.log("courseIds type: ", typeof courseIds);

      // console.log("userId: ", userId);
      const newlyAddedEpisode = await client.create(episodeDoc);

      await client
        .patch(sectionId)
        // Ensure that the `reviews` arrays exists before attempting to add items to it
        .setIfMissing({ episodes: [] })
        // Add the items after the last item in the array (append)
        .insert("after", "episodes[-1]", [
          { _type: "reference", _ref: newlyAddedEpisode._id },
        ])
        .commit({
          // Adds a `_key` attribute to array items, unique within the array, to
          // ensure it can be addressed uniquely in a real-time collaboration context
          autoGenerateArrayKeys: true,
        });
      res.status(200).json({ msg: "lecture added" });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
