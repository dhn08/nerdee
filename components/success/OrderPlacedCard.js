import React from "react";
import Link from "next/link";

function OrderPlacedCard() {
  return (
    <div className="text-center border p-5">
      <div className="text-gray-300 text-9xl">
        <ion-icon name="cart"></ion-icon>
      </div>
      <h3 className="text-sm md:text-base">Your order is succesfull.</h3>
      <Link href="/">
        <button className="text-sm md:text-base p-2 inline-block mx-auto bg-red-500 my-4  text-gray-50 rounded font-semibold">
          Keep Shopping
        </button>
      </Link>
    </div>
  );
}

export default OrderPlacedCard;
