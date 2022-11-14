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
const mailOptions = {
  from: "btech19eskcs070@skit.ac.in",
  to: "singhdhananjay.2001@gmail.com",
  subject: "New Request for register",
  text: "Testing",
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const document = req.body;
      const query = `*[_type == "tempteacher" && email=='${document.email}'][0]`;
      const check = await client.fetch(query);
      if (check) {
        return res.status(201).json("Email already regestered");
      } else {
        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //     // do something useful
        //   }
        // });
        await client
          .create(document)
          .then(() =>
            res.status(201).json("You can sign in when you are verified")
          );
      }
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
