import { hash } from "bcryptjs";
import client from "../../utils/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const document = req.body;
      const newDocument = {
        _type: "user",
        name: document.name,
        email: document.email,
        password: await hash(document.password, 12),
        role: "Student",
      };

      const query = `*[_type == "user" && email=='${document.email}'][0]`;
      const check = await client.fetch(query);
      if (check) {
        return res.status(201).json("Email already regestered");
      } else {
        await client
          .create(newDocument)
          .then(() => res.status(201).json("Sign up succesfull"));
      }
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
