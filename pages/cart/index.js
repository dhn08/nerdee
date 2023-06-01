import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/layouts/Main";
import CartItem from "../../components/cart/CartItem";
import NoItemCart from "../../components/cart/NoItemCart";
import CartContext from "../../context/CartContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
const stripePromise = loadStripe(process.env.stripe_public_key);
function CartIndex() {
  // const [cartSize,setCartSize]=useState(0)
  const { data } = useSession();
  const { cart, removeCart, clearCart } = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState();
  const [cartReady, setCartReady] = useState(false);
  const [requestingPayment, setRequestingPayment] = useState(false);

  const [cartDetails, setCartDetails] = useState([]);

  const router = useRouter();

  const handleCheckout = async () => {
    if (cart.length) {
      setRequestingPayment(true);
      if (!data?.user) {
        console.log("indise if");
        setRequestingPayment(false);
        toast.error("Please login to proceed!!");
        router.push("/auth/login");
        return;
      }

      const stripe = await stripePromise;
      const checkoutSession = await axios.post("/api/payment", {
        cartDetails,
        userId: data.user._id,
        cart,
      });
      //redirect the user
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        setRequestingPayment(false);
        toast.error("Sorry there was an error!!");
      }

      //   const res = await fetch(`${NEXT_BACKEND_URI}/payment/`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ cart }),
      //   });
      //   if (res.ok) {
      //     const data = await res.json();
      //     toast.success("Redirecting you to payment page...");
      //     window.location = data.url;
      //   }
      //   if (res.status == 403) {
      //     setRequestingPayment(false);
      //     toast.error("Please login to proceed!!");
      //     await router.push("/auth/login");
      //   }
      //   if (!res.ok) {
      //     setRequestingPayment(false);
      //     toast.error("Sorry there was an error!!");
      //   }
      // }
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (cart.length > 0) {
        const payload = { ids: cart };

        const { data } = await axios.post(
          "http://localhost:3000/api/course/cart",
          payload
        );
        console.log("initial data", data);
        console.log("cart total", data.cart_total);
        console.log("cart details", data.cartDetails);

        setCartTotal(data.cart_total);
        setCartDetails(data.cartDetails);
        setCartReady(true);
      }
    }
    fetchData();
  }, [cart]);

  const removeCartDetail = (uuid) => {
    const index = cartDetails.findIndex((detail) => detail._id === uuid);

    if (index > -1) {
      const currentCart = [...cartDetails];

      currentCart.splice(index, 1);

      setCartDetails([...currentCart]);
    }
  };

  return (
    <MainLayout>
      <section className="w-full py-14 md:py-20 bg-gray-900 pl-10">
        <h2 className="text-3xl text-gray-100 font-medium">Shopping Cart</h2>
      </section>

      <section className="w-full flex flex-col md:flex-row justify-between pt-12 px-10  mb-20">
        <div className=" md:w-8/12 md:mx-auto">
          <h3 className="text-lg my-2">{cart.length} Course in Cart</h3>

          {cart.length > 0 && cartReady ? (
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
          )}
        </div>
        {cart.length > 0 && (
          <div className="md:w-3/12">
            <h4 className=" text-gray-400 text-lg">Total:</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold my-2">
              ₹{cartTotal}
            </h2>
            <button
              disabled={requestingPayment}
              onClick={handleCheckout}
              className="block text-sm md:text-base w-full bg-red-500 my-4 py-3 text-gray-50 rounded font-semibold"
            >
              {requestingPayment ? "Please wait ..." : "Checkout"}
            </button>
            <button
              onClick={clearCart}
              className="block text-sm md:text-base w-full bg-gray-200 my-2 py-3 text-gray-800 rounded font-semibold"
            >
              Clear Cart
            </button>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default CartIndex;

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session?.user.role == "Teacher") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
