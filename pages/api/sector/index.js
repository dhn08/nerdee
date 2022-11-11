import client from "../../../utils/client";
import { allSectorsQuery } from "../../../utils/queries";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const query = allSectorsQuery();
      const data = await client.fetch(query);
      res.status(200).json({ data });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
