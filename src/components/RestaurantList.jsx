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

  return (
    <>
      <div id="search-button" className="mx-auto max-w-[1060px]">
        <SearchButton
          searchText={searchText}
          setSearchText={setSearchText}
          restaurants={restaurants}
          setFilteredRestaurants={setFilteredRestaurants}
        />
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
