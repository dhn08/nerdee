import React, { useContext, useEffect } from "react";
import Main from "../components/layouts/Main";

import { useRouter } from "next/router";

import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import OrderPlacedCard from "../components/success/OrderPlacedCard";
import CartContext from "../context/CartContext";
const stripePromise = loadStripe(process.env.stripe_public_key);
function Success() {
  // const [cartSize,setCartSize]=useState(0)

  const { cart, clearCart } = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Main>
      <section className="w-full py-14 md:py-20 bg-gray-900 pl-10">
        <h2 className="text-3xl text-gray-100 font-medium">Order succesfull</h2>
      </section>

      <section className="w-full flex flex-col md:flex-row justify-between pt-12 px-10  mb-20">
        <div className=" md:w-8/12 md:mx-auto">
          <h3 className="text-lg my-2">{cart.length} Course in Cart</h3>
          <OrderPlacedCard />
          {/* {cart.length > 0 && cartReady ? (
            <>
              {cartDetails.length
                ? cart.map((item) => {
                    const courseItem = cartDetails.find(
                      (detail) => item == detail._id
                    );

                    return (
                      <CartItem
                        key={item}
                        detail={courseItem}
                        removeCart={removeCart}
                        removeCartDetail={removeCartDetail}
                      />
                    );
                  })
                : ""}
            </>
          ) : (
            <NoItemCart />
          )} */}
        </div>
      </section>
    </Main>
  );
}

export default Success;
