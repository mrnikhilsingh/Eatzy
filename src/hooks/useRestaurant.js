import { useState, useEffect } from "react";
import axios from "axios";

import { RESTAURANT_API_URL } from "../lib/constants";

const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    try {
      const response = await axios.get(RESTAURANT_API_URL);
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
  return {
    restaurants,
    setRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
  };
};

export default useRestaurant;
