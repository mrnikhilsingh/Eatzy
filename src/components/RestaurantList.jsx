import { useState } from "react";

import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";
import SearchButton from "./SearchButton";

import useRestaurant from "../hooks/useRestaurant";

const RestaurantList = () => {
  const [searchText, setSearchText] = useState("");

  const { restaurants, filteredRestaurants, setFilteredRestaurants } =
    useRestaurant();

  // random array to multiply and map shimmer card
  const randomArray = new Array(8).fill("");

  // filter top rated restaurants
  const handleClick = () => {
    const filteredRestaurants = restaurants.filter(
      (restaurant) => restaurant.info.avgRating >= 4.5,
    );
    setFilteredRestaurants(filteredRestaurants);
  };

  return (
    <>
      <div className="mx-auto flex max-w-[1060px] flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div>
          <h1 className="font-bold text-gray-800 md:text-xl">
            Restaurants with online food delivery
          </h1>
          <button
            onClick={handleClick}
            className="mt-3 cursor-pointer rounded-md bg-orange-500 px-3 py-1 font-semibold text-white transition-colors hover:bg-orange-600 md:px-4 md:py-1.5"
          >
            Top Rated
          </button>
        </div>
        <hr className="h-0.5 border-0 bg-gray-200 sm:hidden"></hr>

        <SearchButton
          searchText={searchText}
          setSearchText={setSearchText}
          restaurants={restaurants}
          setFilteredRestaurants={setFilteredRestaurants}
        />
      </div>

      <div
        id="restaurant-list"
        className="mx-auto mt-8 grid max-w-[1060px] grid-cols-2 flex-wrap justify-between gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-x-3 md:grid-cols-4 lg:gap-x-8"
      >
        {!restaurants
          ? randomArray.map((el, index) => {
              return <ShimmerCard key={index} />;
            })
          : filteredRestaurants?.map((restaurant) => {
              return (
                <RestaurantCard
                  restaurant={restaurant}
                  key={restaurant.info.id}
                />
              );
            })}
      </div>
    </>
  );
};

export default RestaurantList;
