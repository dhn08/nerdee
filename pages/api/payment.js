const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { cartDetails, userId, cart } = req.body;

  const transformedItems = cartDetails.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image.asset.url],
      },
    },
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/Success`,
    cancel_url: `${process.env.HOST}/cart`,
    metadata: {
      userId,
      images: JSON.stringify(cartDetails.map((item) => item.image.asset.url)),
      cart: JSON.stringify(cart),
    },
  });
  res.status(200).json({ id: session.id });
}
