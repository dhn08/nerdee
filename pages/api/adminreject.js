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
      const data = req.body;

      const mailOptions = {
        from: "btech19eskcs070@skit.ac.in",
        to: `${data.email}`,
        subject: "Rejected by Admin",
        text: "Sorry you are rejected by admin",
      };

      await client.delete(data._id);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          // do something useful
        }
      });
      res.status(201).json("Rejected teacher");
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
