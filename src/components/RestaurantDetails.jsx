import { useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../store/cartSlice";
import { toast } from "sonner";

import ShimmerRestaurantDetail from "./ShimmerRestaurantDetail";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { IMG_CDN_URL } from "../lib/constants";

const RestaurantDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const cityName = useSelector((store) => store.city);
  const cartItems = useSelector((store) => store.cart);
  const { latitude, longitude } = useSelector((store) => store.location);

  // fetch restaurant menu data using custom hook
  const [restaurant, categories, deals] = useRestaurantMenu({
    id,
    latitude,
    longitude,
  });

  const itemCategories = categories?.filter((category) => {
    const type = category.card.card["@type"];
    return (
      type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      type ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );
  });

  const topPicks = categories?.filter((category) => {
    const type = category.card.card["@type"];
    return (
      type === "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel"
    );
  });

  // handle add to cart
  const handleClick = (item) => {
    dispatch(addItem(item));
    toast.success("Item added to cart");
  };

  // increment item quantity
  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  // decrement quantity or remove item
  const handleDecrementQuantity = (id, quantity) => {
    if (quantity <= 1) {
      dispatch(removeItem(id));
      toast.success("Item removed");
    }
    dispatch(decrementQuantity(id));
  };

  if (restaurant === null) return <ShimmerRestaurantDetail />;

  return (
    <div className="mx-auto pt-8 sm:pt-10 md:max-w-3xl">
      <p className="flex gap-1 text-[10px] font-semibold text-gray-500 sm:gap-2">
        <Link
          to="/"
          className="cursor-pointer transition-colors hover:text-black"
        >
          Home
        </Link>
        /
        <span className="cursor-pointer transition-colors hover:text-black">
          {cityName}
        </span>
        /<span className="text-black">{restaurant?.info?.name}</span>
      </p>
      <div className="mt-20">
        {/* Restaurant Details Section */}
        <h1 className="text-2xl font-bold sm:text-3xl">
          {restaurant?.info?.name}
        </h1>
        <div className="mt-5 rounded-4xl bg-gradient-to-t from-neutral-300/80 p-4">
          <div className="rounded-3xl border border-gray-300 bg-white p-4 sm:p-5">
            <div className="flex items-center font-bold">
              <svg
                className="shrink-0"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                strokecolor="rgba(2, 6, 12, 0.92)"
                fillcolor="rgba(2, 6, 12, 0.92)"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                ></circle>
                <path
                  d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                  fill="white"
                ></path>
                <defs>
                  <linearGradient
                    id="StoreRating20_svg__paint0_linear_32982_71567"
                    x1="10"
                    y1="1"
                    x2="10"
                    y2="19"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#21973B"></stop>
                    <stop offset="1" stopColor="#128540"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <p className="ml-1">
                {restaurant?.info?.avgRating}(
                {restaurant?.info?.totalRatingsString})
              </p>
              <div
                id="circle"
                className="mx-2 mt-1 h-1 w-1 rounded-full bg-gray-400"
              ></div>
              <p>{restaurant?.info?.costForTwoMessage}</p>
            </div>
            <p className="mt-2 text-sm font-bold text-orange-600">
              {restaurant?.info?.cuisines?.join(", ")}
            </p>
            <div className="mt-2 flex items-center gap-x-4">
              <div className="flex flex-col items-center pt-0.5">
                <div
                  id="circle"
                  className="h-2 w-2 rounded-full bg-gray-300"
                ></div>
                <div
                  id="verticle_line"
                  className="h-6 w-[1px] shrink-0 bg-gray-300"
                ></div>
                <div
                  id="circle2"
                  className="h-2 w-2 rounded-full bg-gray-300"
                ></div>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-bold">
                  Outlet {" - "}
                  <span className="font-semibold text-gray-500">
                    {restaurant?.info?.areaName}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  {restaurant?.info?.sla?.slaString?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* deals for you section */}
        {deals && (
          <div id="deals_for_you" className="mt-10">
            <p className="mb-4 text-xl font-bold">Deals for you</p>
            <div className="flex flex-nowrap items-center gap-x-3 overflow-x-auto sm:gap-x-5">
              {deals.map((deal) => (
                <div
                  key={deal?.info?.offerIds[0]}
                  className="flex min-w-xs items-center gap-x-2 rounded-3xl border border-gray-200 bg-white py-2 pl-2"
                >
                  <div id="img" className="max-w-14">
                    <img
                      className="h-full w-full"
                      src={IMG_CDN_URL + deal?.info?.offerLogo}
                      alt={deal?.info?.header}
                      loading="lazy"
                    />
                  </div>
                  <div id="detail" className="font-bold">
                    <p className="text-lg">{deal?.info?.header}</p>
                    <p className="text-sm text-gray-500">
                      {deal?.info?.couponCode || deal?.info?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* menu section */}
        <div
          id="menu_header"
          className="mt-10 mb-5 flex items-center justify-center text-center font-bold text-gray-600"
        >
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 16"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity=".8" fill="#000" stroke="#000" strokeWidth=".2">
              <path d="M10.558 4c-.073 0-.119.002-.13.003-1.821 0-3.33.92-4.788 1.811-1.456.889-2.961 1.808-4.796 1.808a.252.252 0 0 0-.251.252c0 .14.112.253.251.253h6.29a.252.252 0 0 0 .25-.253.252.252 0 0 0-.25-.252H3.33c.91-.363 1.747-.874 2.57-1.376 1.464-.894 2.847-1.738 4.541-1.738.03-.002 1.683-.074 2.742.937.598.571.902 1.389.902 2.43.002.033.097 1.753-.882 2.8-.508.544-1.226.82-2.134.82-.021 0-1.156.034-1.864-.655-.388-.377-.583-.912-.58-1.59 0-.012 0-.753.554-1.31.432-.435 1.088-.655 1.95-.655h.052a.252.252 0 0 0 .002-.505c-1.03-.01-1.827.262-2.366.809a2.492 2.492 0 0 0-.694 1.665c-.004.816.243 1.475.736 1.952.865.839 2.167.795 2.22.793h.002c1.043 0 1.884-.33 2.49-.98 1.129-1.21 1.02-3.082 1.016-3.161 0-1.17-.357-2.112-1.061-2.783C12.48 4.08 11.004 4 10.558 4ZM23.163 7.748h-7.327a.248.248 0 0 0-.243.252c0 .14.109.252.243.252h7.328A.248.248 0 0 0 23.407 8a.248.248 0 0 0-.244-.252Z"></path>
            </g>
          </svg>
          <span className="px-0.5 text-lg">MENU</span>
          <svg
            height="24"
            width="24"
            className="scale-x-[-1]"
            viewBox="0 0 24 16"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity=".8" fill="#000" stroke="#000" strokeWidth=".2">
              <path d="M10.558 4c-.073 0-.119.002-.13.003-1.821 0-3.33.92-4.788 1.811-1.456.889-2.961 1.808-4.796 1.808a.252.252 0 0 0-.251.252c0 .14.112.253.251.253h6.29a.252.252 0 0 0 .25-.253.252.252 0 0 0-.25-.252H3.33c.91-.363 1.747-.874 2.57-1.376 1.464-.894 2.847-1.738 4.541-1.738.03-.002 1.683-.074 2.742.937.598.571.902 1.389.902 2.43.002.033.097 1.753-.882 2.8-.508.544-1.226.82-2.134.82-.021 0-1.156.034-1.864-.655-.388-.377-.583-.912-.58-1.59 0-.012 0-.753.554-1.31.432-.435 1.088-.655 1.95-.655h.052a.252.252 0 0 0 .002-.505c-1.03-.01-1.827.262-2.366.809a2.492 2.492 0 0 0-.694 1.665c-.004.816.243 1.475.736 1.952.865.839 2.167.795 2.22.793h.002c1.043 0 1.884-.33 2.49-.98 1.129-1.21 1.02-3.082 1.016-3.161 0-1.17-.357-2.112-1.061-2.783C12.48 4.08 11.004 4 10.558 4ZM23.163 7.748h-7.327a.248.248 0 0 0-.243.252c0 .14.109.252.243.252h7.328A.248.248 0 0 0 23.407 8a.248.248 0 0 0-.244-.252Z"></path>
            </g>
          </svg>
        </div>

        {/* Top Picks */}
        {topPicks.length !== 0 && (
          <div id="top_picks" className="mb-10">
            <p className="mb-4 text-xl font-bold">Top Picks</p>
            <div className="flex flex-nowrap items-center gap-x-3 overflow-x-auto sm:gap-x-5">
              {topPicks[0]?.card?.card?.carousel.map((item) => {
                const isExistingCartItem = cartItems.find(
                  (cartItem) => cartItem?.info?.id === item?.dish?.info?.id,
                );

                return (
                  <div key={item?.bannerId} className="relative shrink-0">
                    <div id="img" className="max-w-52 sm:max-w-3xs">
                      <img
                        className="h-full w-full"
                        src={IMG_CDN_URL + item?.creativeId}
                        alt={item?.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-5 flex w-full items-center justify-between px-6">
                      <div className="flex flex-col font-semibold text-white">
                        {item?.dish?.info?.finalPrice ? (
                          <>
                            <span className="pr-1 line-through">
                              ₹{Math.floor(item?.dish?.info?.price / 100)}
                            </span>
                            <span>
                              ₹{Math.floor(item?.dish?.info?.finalPrice / 100)}
                            </span>
                          </>
                        ) : (
                          <span>
                            ₹
                            {Math.floor(item?.dish?.info?.price / 100) ||
                              Math.floor(item?.dish?.info?.defaultPrice / 100)}
                          </span>
                        )}
                      </div>
                      {isExistingCartItem ? (
                        <div className="flex items-center overflow-hidden rounded-md border border-gray-300 bg-white text-lg">
                          <button
                            onClick={() =>
                              handleDecrementQuantity(
                                item?.dish?.info?.id,
                                isExistingCartItem?.info?.quantity,
                              )
                            }
                            className="cursor-pointer px-3 py-1 text-orange-500 hover:bg-orange-50"
                          >
                            -
                          </button>
                          <span className="border-x border-gray-300 px-3 py-1 font-semibold text-green-700">
                            {isExistingCartItem?.info?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrementQuantity(item?.dish?.info?.id)
                            }
                            className="cursor-pointer px-3 py-1 text-orange-500 hover:bg-orange-50"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleClick(item?.dish)}
                          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-1 text-lg font-bold text-green-700 shadow-sm sm:px-10"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommended Items Accordion */}
        <div data-testid="resCategories" className="bg-white">
          {itemCategories?.map((itemCategory, index) => {
            return (
              <RestaurantCategory
                key={itemCategory.card.card.title}
                itemCategory={itemCategory}
                activeIndex={activeIndex === index}
                setActiveIndex={() =>
                  activeIndex === index
                    ? setActiveIndex(null)
                    : setActiveIndex(index)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
