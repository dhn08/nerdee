import React from "react";

function CartItem({ detail, removeCart, removeCartDetail }) {
  console.log(detail);

  const handleRemove = () => {
    removeCart(detail._id);
    removeCartDetail(detail._id);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row  md:justify-between border rounded-md p-3 my-2 shadow-sm">
      <div className="overflow-hidden lg:w-2/12 h-32 lg:h-20 border rounded-md ">
        <img
          src={detail.image.asset.url}
          className="w-full h-full"
          alt="course_card_img"
        />
      </div>

      <div className="lg:w-7/12">
        <h3 className="font-semibold">
          {detail.title.length > 60
            ? detail.title.slice(0, 59) + "..."
            : detail.title}
        </h3>

        <h5 className="text-xs  text-gray-400">By {detail.author}</h5>
      </div>

      <div className="w-1/12">
        <h3 className="text-xl font-bold">₹{detail.price}</h3>
      </div>

      <div className="w-1/12">
        <p>
          <button className="my-1 lg:my-0" onClick={handleRemove}>
            Remove
          </button>
        </p>
      </div>
    </div>
  );
}

export default CartItem;
