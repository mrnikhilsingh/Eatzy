import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import axios from "axios";
import ShimmerCard from "./ShimmerCard";
import SearchButton from "./SearchButton";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [searchText, setSearchText] = useState("");

  // random array to multiply and map shimmer card
  const randomArray = new Array(8).fill("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    try {
      const response = await axios.get(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4717584&lng=77.1315321&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      );
      const data = response.data;

      setRestaurants(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      );
      setFilteredRestaurants(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <div id="search-button" className="mx-auto mt-10 max-w-[1060px]">
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
