import client from "../../utils/client";
import nodemailer from "nodemailer";
import { hash } from "bcryptjs";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
// const transporter = nodemailer.createTransport({
//   host: process.env.SMPT_HOST,
//   port: process.env.SMPT_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMPT_USER, // generated ethereal user
//     pass: process.env.SMPT_PASSWORD, // generated ethereal password
//   },
//   // service: process.env.SMPT_SERVICE,
// });
// // const mailOptions = {
// //   from: "btech19eskcs070@skit.ac.in",
// //   to: "singhdhananjay.2001@gmail.com",
// //   subject: "New Request for register",
// //   text: "There is new request for teacher registration",
// // };
// const mailOptions = {
//   from: process.env.SMPT_USER,
//   to: process.env.ADMIN_MAIL,
//   subject: "New Request for register",
//   text: "There is new request for teacher registration",
// };
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender(process.env.SMPT_USER);

const recipients = [new Recipient(process.env.ADMIN_MAIL)];

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setSubject("New Request for register")
  .setHtml("<strong>There is new request for teacher registration</strong>");

export default async function handler(req, res) {
  console.log("sentFrom", sentFrom);
  // console.log("mailOptions:", mailOptions);
  if (req.method === "POST") {
    try {
      const { _type, name, email, password } = req.body;
      const document = {
        _type,
        name,
        email,
        password: await hash(password, 12),
      };
      const query1 = `*[_type == "tempteacher" && email=='${email}'][0]`;
      const query2 = `*[_type == "user" && email=='${email}'][0]`;

      const check1 = await client.fetch(query1);
      const check2 = await client.fetch(query2);
      console.log("Check1 :", check1);
      console.log("Check2 :", check2);

      if (check1 || check2) {
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
        try {
          const mailResponse = await mailerSend.email.send(emailParams);
          console.log("✅ Email sent successfully:", mailResponse);
        } catch (emailError) {
          console.error("❌ Error sending email:", emailError);
        }

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
