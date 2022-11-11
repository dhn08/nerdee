import client from "../../../utils/client";
import { sectorDetailQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const query = sectorDetailQuery(id);
      const data = await client.fetch(query);
      res.status(200).json({ data });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
