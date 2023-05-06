import client from "../../../utils/client";
import { cartDetailQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  const { ids } = req.body;
  const i = JSON.stringify(ids);
  var cart_total = 0;
  if (req.method === "POST") {
    try {
      const query = cartDetailQuery(i);
      console.log(query);

      const cartDetails = await client.fetch(query);
      cartDetails.forEach((element) => {
        cart_total += element.price;
      });

      res.status(200).json({ cartDetails, cart_total });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
