import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import axios from "axios";
import ShimmerCard from "./ShimmerCard";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    try {
      const response = await axios.get(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4717584&lng=77.1315321&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      );
      const data = response.data;
      //   console.log(data);

      setRestaurants(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //   console.log(restaurants);
  // if (restaurants === null) "Loading...";

  return (
    <div
      id="restaurant-list"
      className="mx-auto mt-10 flex max-w-[1060px] flex-wrap justify-between gap-y-5"
    >
      {!restaurants
        ? new Array(8).fill(8).map(() => {
            return <ShimmerCard />;
          })
        : restaurants?.map((restaurant) => {
            return (
              <RestaurantCard
                restaurant={restaurant}
                key={restaurant.info.id}
              />
            );
          })}
    </div>
  );
};

export default RestaurantList;
