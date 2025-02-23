import client from "../../utils/client";
import nodemailer from "nodemailer";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
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
      // const mailOptions = {
      //   from: process.env.SMPT_USER,
      //   to: `${newDocument.email}`,
      //   subject: "Approved by admin",
      //   text: "Congratulation you are approved by admin",
      // };

      const sentFrom = new Sender(process.env.SMPT_USER);

      const recipients = [new Recipient(newDocument.email)];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Approved by admin")
        .setHtml("<strong>Congratulation you are approved by admin</strong>");

      const query = `*[_type == "user" && email=='${document.email}'][0]`;
      const check = await client.fetch(query);
      if (check) {
        return res.status(201).json("Email already regestered");
      } else {
        await client.delete(document._id);
        await client
          .create(newDocument)
          .then(() => res.status(201).json("Teacher Approved"));

        try {
          const mailResponse = await mailerSend.email.send(emailParams);
          console.log("✅ Email sent successfully:", mailResponse);
        } catch (emailError) {
          console.error("❌ Error sending email:", emailError);
        }
      }
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
