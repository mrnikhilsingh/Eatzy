import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";

import { IMG_CDN_URL } from "../lib/constants";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item?.card?.info?.price / 100) * item?.card?.info?.quantity,
    0,
  );
  const deliveryFee = 29;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white shadow-sm">
              <div className="border-b border-gray-300 p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Your Order
                </h2>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.card.info.id} className="border-gray-300 p-4">
                    <div className="flex items-start space-x-4">
                      {/* Item Image */}
                      <img
                        src={IMG_CDN_URL + item.card.info.imageId}
                        alt={item.card.info.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {item.card.info.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.card.info.category}
                            </p>
                            {item.customization && (
                              <p className="mt-1 text-xs text-gray-400">
                                {item?.customization}
                              </p>
                            )}
                          </div>
                          <p className="font-semibold text-gray-800">
                            ₹{item?.card?.info?.price / 100}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                            <button
                              onClick={() =>
                                handleDecrementQuantity(item?.card?.info?.id)
                              }
                              className="cursor-pointer px-3 py-1 text-orange-500 hover:bg-orange-50"
                            >
                              -
                            </button>
                            <span className="border-x border-gray-300 px-3 py-1">
                              {item?.card?.info?.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrementQuantity(item?.card?.info?.id)
                              }
                              className="cursor-pointer px-3 py-1 text-orange-500 hover:bg-orange-50"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.card.info.id)}
                            className="cursor-pointer text-sm text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Items */}
              <div className="border-t border-gray-300 p-4">
                <button className="w-full cursor-pointer rounded-md border border-orange-500 py-2 text-orange-500 hover:bg-orange-50">
                  + Add more items
                </button>
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="mt-4 rounded-lg bg-white shadow-sm">
              <div className="p-4">
                <h3 className="mb-3 font-medium text-gray-800">
                  Delivery Instructions
                </h3>
                <textarea
                  placeholder="Add cooking instructions, delivery notes, etc."
                  className="h-20 w-full resize-none rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Order Summary */}
              <div className="rounded-lg bg-white shadow-sm">
                {/* Delivery Address */}
                <div className="border-b border-gray-300 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Deliver to</h3>
                      <p className="mt-1 text-sm text-gray-600">Home</p>
                      <p className="text-xs text-gray-500">
                        123 Main Street, Sector 12, Gurugram
                      </p>
                    </div>
                    <button className="cursor-pointer text-sm text-orange-500 hover:text-orange-600">
                      Change
                    </button>
                  </div>
                </div>

                {/* Bill Details */}
                <div className="border-b border-gray-300 p-4">
                  <h3 className="mb-3 font-medium text-gray-800">
                    Bill Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Item total</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & charges</span>
                      <span>₹{taxes}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-2 font-semibold">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="border-b border-gray-300 p-4">
                  <h3 className="mb-3 font-medium text-gray-800">Payment</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        className="mr-2"
                        defaultChecked
                      />
                      <span className="text-sm">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="payment" className="mr-2" />
                      <span className="text-sm">Online Payment</span>
                    </label>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="p-4">
                  <button className="w-full cursor-pointer rounded-md bg-orange-500 py-3 font-medium text-white transition-colors hover:bg-orange-600">
                    Place Order - ₹{total}
                  </button>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    By placing order, you agree to our Terms & Conditions
                  </p>
                </div>
              </div>

              {/* Offers */}
              <div className="rounded-lg bg-white shadow-sm">
                <div className="p-4">
                  <h3 className="mb-3 font-medium text-gray-800">
                    Apply Coupon
                  </h3>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                    <button className="cursor-pointer rounded-r-md bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
