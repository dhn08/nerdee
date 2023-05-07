const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import axios from "axios";
import { buffer } from "micro";
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fulfillOrder = async (session) => {
  const { cart, userId } = session.metadata;
  console.log("Inside fullfill order");
  console.log("cart:", cart);
  console.log("userId:", userId);

  const result = await axios.post(
    "http://localhost:3000/api/addcoursestudent",
    {
      courseIds: JSON.parse(cart),
      userId,
    }
  );
  // console.log("result", result);
  return result;
};
export default async (req, res) => {
  if (req.method == "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;
    //verify event comes from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("Error", error.message);
      return res.status(400).send(`Webhook error:${error.message}`);
    }
    //handle the spech checkout.session.complete event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("han bhai");
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook erro:`, err.message));
    }
  }
};
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
