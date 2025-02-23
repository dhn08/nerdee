import client from "../../utils/client";
import nodemailer from "nodemailer";
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
//   //   service: "gmail",
//   //   auth: {
//   //     user: "btech19eskcs070@skit.ac.in",
//   //     pass: "23508414",
//   //   },
// });
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // const mailOptions = {
      //   from: process.env.SMPT_USER,
      //   to: `${data.email}`,
      //   subject: "Rejected by Admin",
      //   text: "Sorry you are rejected by admin",
      // };
      const sentFrom = new Sender(process.env.SMPT_USER);

      const recipients = [new Recipient(data.email)];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Rejected by Admin")
        .setHtml("<strong>Sorry you are rejected by admin</strong>");

      await client.delete(data._id);
      try {
        const mailResponse = await mailerSend.email.send(emailParams);
        console.log("✅ Email sent successfully:", mailResponse);
      } catch (emailError) {
        console.error("❌ Error sending email:", emailError);
      }
      res.status(201).json("Rejected teacher");
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
