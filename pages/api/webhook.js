const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import axios from "axios";
import { buffer } from "micro";
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
// const fulfillOrder = async (session) => {
//   const { cart, userId } = session.metadata;
//   // console.log("Inside fullfill order");
//   // console.log("cart:", cart);
//   // console.log("userId:", userId);
//   // const result = await axios.post(
//   //   "http://localhost:3000/api/addcoursestudent",
//   //   {
//   //     courseIds: JSON.parse(cart),
//   //     userId,
//   //   }
//   // );
//   // console.log("Insied fulFill order :", process.env.HOST);
//   // console.log("Han bhai fulfill");
//   const result = await axios.post(
//     `${process.env.HOST}/api/addcoursestudent`,
//     {
//       courseIds: JSON.parse(cart),
//       userId,
//     },
//     { timeout: 10000 }
//   );
//   // console.log("result", result);
//   return result;
// };

// const handleWebhook = async (req, res) => {
//   if (req.method == "POST") {
//     const requestBuffer = await buffer(req);
//     const payload = requestBuffer.toString();
//     const sig = req.headers["stripe-signature"];
//     let event;
//     //verify event comes from stripe
//     try {
//       event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     } catch (error) {
//       console.log("Error", error.message);
//       return res.status(400).send(`Webhook error:${error.message}`);
//     }
//     //handle the spech checkout.session.complete event
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       // console.log("han bhai");
//       return fulfillOrder(session)
//         .then(() => res.status(200))
//         .catch((err) => res.status(400).send(`Webhook erro:`, err.message));
//     }
//   }
// };

const fulfillOrder = (session) => {
  const { cart, userId } = session.metadata;
  console.log("Inside fullfill order");
  console.log("cart:", cart);
  console.log("userId:", userId);
  axios.post(`${process.env.HOST}/api/addcoursestudent`, {
    courseIds: JSON.parse(cart),
    userId,
  });
  // console.log("result", result);
};

//currectly working
// const handleWebhook = async (req, res) => {
//   if (req.method == "POST") {
//     const requestBuffer = await buffer(req);
//     const payload = requestBuffer.toString();
//     const sig = req.headers["stripe-signature"];
//     let event;
//     //verify event comes from stripe
//     try {
//       event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     } catch (error) {
//       console.log("Error", error.message);
//       return res.status(400).send(`Webhook error:${error.message}`);
//     }
//     //handle the spech checkout.session.complete event
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       // console.log("han bhai");
//       fulfillOrder(session);
//       return res.status(200);
//     }
//   }
// };

//using try catch
const handleWebhook = async (req, res) => {
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
      // console.log("han bhai");

      try {
        fulfillOrder(session);
        return res.status(200);
      } catch (error) {
        console.error("Error fulfilling order:", error);

        // If the error is due to a gateway timeout, return a response with a status code indicating no further retries
        if (error instanceof GatewayTimeoutError) {
          return res
            .status(503)
            .send(`Webhook processing failed: ${error.message}`);
        } else {
          return res
            .status(500)
            .send(`Webhook processing failed: ${error.message}`);
        }
      }
    }
  }
};
export default handleWebhook;
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
