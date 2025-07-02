import { useState } from "react";
import { useParams } from "react-router";

import ShimmerRestaurantDetail from "./ShimmerRestaurantDetail";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();

  // fetch restaurant menu data using custom hook
  const [restaurant, categories] = useRestaurantMenu(id);

  const itemCategories = categories?.filter((category) => {
    const type = category.card.card["@type"];
    return (
      type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      type ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );
  });

  if (restaurant === null) return <ShimmerRestaurantDetail />;

  return (
    <div>
      <div className="mx-auto md:max-w-3xl">
        {/* Restaurant Details */}
        <h1 className="text-2xl font-bold sm:text-3xl">
          {restaurant?.info?.name}
        </h1>
        <div className="mt-5 rounded-xl border border-gray-300 bg-white p-4 shadow-lg sm:p-5">
          <div className="flex items-center font-bold">
            <svg
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
            <span className="px-2 text-gray-300">|</span>
            <p>{restaurant?.info?.costForTwoMessage}</p>
          </div>
          <p className="mt-2 text-sm font-bold text-orange-600">
            {restaurant?.info?.cuisines?.join(", ")}
          </p>
          <p className="mt-2 text-sm font-bold">
            Outlet {" - "}
            <span className="font-semibold text-gray-500">
              {restaurant?.info?.areaName}
            </span>
          </p>
          <p className="mt-2 text-sm font-bold">
            {restaurant?.info?.sla?.slaString?.toLowerCase()}
          </p>
        </div>

        {/* Recommended Items Accordion */}
        <div data-testid="resCategories" className="mt-10 bg-white">
          {itemCategories.map((itemCategory, index) => {
            return (
              <RestaurantCategory
                key={itemCategory.card.card.categoryId}
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
