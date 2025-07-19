import { useState, useEffect } from "react";
import axios from "axios";

import getBaseURL from "../utils/getBaseURL";

const useRestaurant = ({ latitude, longitude }) => {
  const [data, setData] = useState(null);
  const [whatsOnYourMind, setWhatsOnYourMind] = useState(null);
  const [topRestaurantChains, setTopRestaurantChains] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = getBaseURL();

  useEffect(() => {
    if (!latitude && !longitude) return;
    fetchRestaurants();
  }, [latitude, longitude]);

  async function fetchRestaurants() {
    try {
      const response = await axios.get(
        `${BASE_URL}/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      );
      const data = response.data;

      setData(data?.data);

      setWhatsOnYourMind(
        data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info,
      );
      setTopRestaurantChains(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
          data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants,
      );
      setRestaurants(
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      );
      setFilteredRestaurants(
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  }
  return {
    data,
    restaurants,
    setRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
    whatsOnYourMind,
    topRestaurantChains,
    error,
  };
};

export default useRestaurant;
