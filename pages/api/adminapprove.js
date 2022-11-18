import client from "../../utils/client";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMPT_MAIL, // generated ethereal user
    pass: process.env.SMPT_PASSWORD, // generated ethereal password
  },
  service: process.env.SMPT_SERVICE,
  //   service: "gmail",
  //   auth: {
  //     user: "btech19eskcs070@skit.ac.in",
  //     pass: "23508414",
  //   },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const document = req.body;
      const newDocument = {
        _type: "user",
        name: document.name,
        email: document.email,
        password: document.password,
        role: "Teacher",
      };
      const mailOptions = {
        from: "btech19eskcs070@skit.ac.in",
        to: `${newDocument.email}`,
        subject: "Approved by admin",
        text: "Congratulation you are approved by admin",
      };

      const query = `*[_type == "user" && email=='${document.email}'][0]`;
      const check = await client.fetch(query);
      if (check) {
        return res.status(201).json("Email already regestered");
      } else {
        await client.delete(document._id);
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            // do something useful
          }
        });
        await client
          .create(newDocument)
          .then(() => res.status(201).json("Teacher Approved"));
      }
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
