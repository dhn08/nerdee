import { unstable_getServerSession } from "next-auth";
import client from "../../../utils/client";
import { authOptions } from "../auth/[...nextauth]";
const multer = require("multer");
// const upload = multer({
//   dest: "./public/uploads/",
// });
import { Readable } from "stream";
const upload = multer();
const fs = require("fs");
export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session.user?.role !== "Teacher" || !session) {
    return res.status(201).json("You are nor authorized to add course");
  }

  if (req.method === "POST") {
    try {
      upload.single("file")(req, res, async (error) => {
        if (error) {
          console.error(error);
          return res.status(400).json({ error: "File upload failed" });
        }

        const file = req.file;
        const { title, description, price, author, selectedOption } = req.body;
        console.log(title, description, price, author, selectedOption);
        const s = new Readable();
        s.push(file.buffer);
        s.push(null);
        // Upload the file to Sanity
        // const stream = fs.createReadStream(file.path);

        const imageData = await client.assets.upload("image", s, {
          filename: file.originalname,
        });

        // Delete the temporary file
        // fs.unlinkSync(file.path);
        const courseDoc = {
          _type: "course",
          title: title,
          author: author,
          description: description,
          price: parseInt(price),
          image: {
            _type: "image",
            asset: {
              _ref: imageData._id, // The asset reference ID
              _type: "reference",
            },
          },
        };

        const newlyAddedCourse = await client.create(courseDoc);
        await client
          .patch(selectedOption)

          .setIfMissing({ featured_courses: [] })

          .insert("after", "featured_courses[-1]", [
            { _type: "reference", _ref: newlyAddedCourse._id },
          ])
          .commit({
            autoGenerateArrayKeys: true,
          });
        await client
          .patch(session.user._id)

          .setIfMissing({ courses: [] })

          .insert("after", "courses[-1]", [
            { _type: "reference", _ref: newlyAddedCourse._id },
          ])
          .commit({
            autoGenerateArrayKeys: true,
          });
        // Return the uploaded image URL
        res.status(200).json({
          msg: "Course Added succesfully",
          newCourse: newlyAddedCourse,
        });
        // res.status(200).json({ fileData: response });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};

// export default async function handler(req, res) {
//   const session = await unstable_getServerSession(req, res, authOptions);
//   if (session.user?.role !== "Teacher" || !session) {
//     return res.status(201).json("You are nor authorized to add course");
//   }

//   if (req.method === "POST") {
//     try {
//       upload.single("file")(req, res, async (error) => {
//         if (error) {
//           console.error(error);
//           return res.status(400).json({ error: "File upload failed" });
//         }

//         const file = req.file;
//         const { title, description, price, author, selectedOption } = req.body;
//         console.log(title, description, price, author, selectedOption);
//         // Upload the file to Sanity
//         const stream = fs.createReadStream(file.path);

//         const imageData = await client.assets.upload("image", stream, {
//           filename: file.originalname,
//         });

//         // Delete the temporary file
//         fs.unlinkSync(file.path);
//         const courseDoc = {
//           _type: "course",
//           title: title,
//           author: author,
//           description: description,
//           price: parseInt(price),
//           image: {
//             _type: "image",
//             asset: {
//               _ref: imageData._id, // The asset reference ID
//               _type: "reference",
//             },
//           },
//         };

//         const newlyAddedCourse = await client.create(courseDoc);
//         await client
//           .patch(selectedOption)
//           // Ensure that the `reviews` arrays exists before attempting to add items to it
//           .setIfMissing({ featured_courses: [] })
//           // Add the items after the last item in the array (append)
//           .insert("after", "featured_courses[-1]", [
//             { _type: "reference", _ref: newlyAddedCourse._id },
//           ])
//           .commit({
//             // Adds a `_key` attribute to array items, unique within the array, to
//             // ensure it can be addressed uniquely in a real-time collaboration context
//             autoGenerateArrayKeys: true,
//           });
//         await client
//           .patch(session.user._id)
//           // Ensure that the `reviews` arrays exists before attempting to add items to it
//           .setIfMissing({ courses: [] })
//           // Add the items after the last item in the array (append)
//           .insert("after", "courses[-1]", [
//             { _type: "reference", _ref: newlyAddedCourse._id },
//           ])
//           .commit({
//             // Adds a `_key` attribute to array items, unique within the array, to
//             // ensure it can be addressed uniquely in a real-time collaboration context
//             autoGenerateArrayKeys: true,
//           });
//         // Return the uploaded image URL
//         return res.status(200).json({
//           msg: "Course Added succesfully",
//           newCourse: newlyAddedCourse,
//         });
//         // res.status(200).json({ fileData: response });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred" });
//     }
//   }
// }
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
