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
      <div
        id="search-button"
        className="mx-auto flex max-w-[1060px] items-center"
      >
        <SearchButton
          searchText={searchText}
          setSearchText={setSearchText}
          restaurants={restaurants}
          setFilteredRestaurants={setFilteredRestaurants}
        />
        <div className="ml-5">
          <button
            onClick={handleClick}
            className="rounded-md border border-gray-400 bg-white px-4 py-1 font-semibold text-gray-800 shadow hover:bg-gray-100"
          >
            Top Rated
          </button>
        </div>
      </div>
      <div
        id="restaurant-list"
        className="mx-auto mt-10 flex max-w-[1060px] flex-wrap justify-between gap-y-5"
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
