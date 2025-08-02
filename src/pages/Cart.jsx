import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import confetti from "canvas-confetti";

import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../store/cartSlice";

import { IMG_CDN_URL } from "../lib/constants";
import emptyCartImg from "../assets/images/empty-cart-image.png";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart);

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (Math.floor(item?.info?.finalPrice / 100) ||
        Math.floor(item?.info?.price / 100) ||
        Math.floor(item?.info?.defaultPrice / 100)) *
        item?.info?.quantity,
    0,
  );
  const deliveryFee = 29;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.success("Item removed.");
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id, quantity) => {
    if (quantity <= 1) {
      dispatch(removeItem(id));
      toast.success("Item removed.");
    }
    dispatch(decrementQuantity(id));
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const handlePlaceOrder = () => {
    dispatch(clearCart());

    toast.success("Your order placed successfully");
    // scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
    });

    // show confetti effect
    confetti({
      particleCount: 300,
      spread: 70,
      origin: { y: 1, x: 1 },
      angle: 130,
    });
    confetti({
      particleCount: 300,
      spread: 70,
      origin: { y: 1, x: 0 },
      angle: 70,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {cartItems.length === 0 ? (
        <>
          <img
            className="mx-auto h-full w-full max-w-xs"
            src={emptyCartImg}
            alt="empty-cart-image"
          />
          <div className="mt-5">
            <p className="text-center text-xl font-bold text-gray-800">
              Your cart is empty
            </p>
            <p className="text-center text-gray-600">
              You can go to home page to view more restaurants
            </p>
          </div>
          <Link
            to="/"
            className="mx-auto mt-5 block max-w-fit cursor-pointer bg-orange-500 px-4 py-2 font-bold text-white transition-colors hover:bg-orange-600"
          >
            SEE RESTAURANTS NEAR YOU
          </Link>{" "}
        </>
      ) : (
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
                    <div key={item.info.id} className="border-gray-300 p-4">
                      <div className="flex items-start space-x-4">
                        {/* Item Image */}
                        <img
                          src={IMG_CDN_URL + item.info.imageId}
                          alt={item.info.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />

                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {item.info.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {item.info.category}
                              </p>
                              {item.customization && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {item?.customization}
                                </p>
                              )}
                            </div>
                            <p className="font-semibold text-gray-800">
                              ₹
                              {Math.floor(item?.info?.finalPrice / 100) ||
                                Math.floor(item?.info?.price / 100) ||
                                Math.floor(item?.info?.defaultPrice / 100)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                              <button
                                onClick={() =>
                                  handleDecrementQuantity(
                                    item?.info?.id,
                                    item?.info?.quantity,
                                  )
                                }
                                className="cursor-pointer px-3 py-1 text-orange-500 hover:bg-orange-50"
                              >
                                -
                              </button>
                              <span className="border-x border-gray-300 px-3 py-1">
                                {item?.info?.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleIncrementQuantity(item?.info?.id)
                                }
                                className="cursor-pointer px-3 py-1 text-orange-500 hover:bg-orange-50"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item?.info?.id)}
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
                  <button
                    onClick={handleNavigate}
                    className="w-full cursor-pointer rounded-md border border-orange-500 py-2 text-orange-500 hover:bg-orange-50"
                  >
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
                        <h3 className="font-medium text-gray-800">
                          Deliver to
                        </h3>
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
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery fee</span>
                        <span>₹{deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxes & charges</span>
                        <span>₹{taxes.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-300 pt-2 font-semibold">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
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
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full cursor-pointer rounded-md bg-orange-500 py-3 font-medium text-white transition-colors hover:bg-orange-600"
                    >
                      Place Order - ₹{total.toFixed(2)}
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
                        className="flex-3/4 rounded-l-md border border-gray-300 px-2 py-3 text-sm focus:outline-none"
                      />
                      <button className="flex-1/4 cursor-pointer rounded-r-md bg-orange-500 px-3 text-sm text-white hover:bg-orange-600">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
