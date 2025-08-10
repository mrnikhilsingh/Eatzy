import { useState, useEffect } from "react";
import axios from "axios";
import getBaseURL from "../utils/getBaseURL";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = getBaseURL();

const fetchRestaurants = async ({ latitude, longitude }) => {
  const { data } = await axios.get(
    `${BASE_URL}/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
  );
  return data;
};

const useRestaurant = ({ latitude, longitude }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants", latitude, longitude],
    queryFn: () => fetchRestaurants({ latitude, longitude }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const whatsOnYourMind =
    data?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.info ??
    null;

  const topRestaurantChains =
    data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants ??
    data?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants ??
    null;

  const restaurants =
    data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants ?? null;

  const [filteredRestaurants, setFilteredRestaurants] = useState(
    restaurants ?? null,
  );

  useEffect(() => {
    if (restaurants) {
      setFilteredRestaurants(restaurants);
    }
  }, [restaurants]);

  return {
    data: data?.data ?? null,
    whatsOnYourMind,
    topRestaurantChains,
    restaurants,
    filteredRestaurants,
    setFilteredRestaurants,
    isLoading,
    error,
  };
};

export default useRestaurant;
