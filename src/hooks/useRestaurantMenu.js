import { useState, useEffect } from "react";
import axios from "axios";
import getBaseURL from "../utils/getBaseURL";

const useRestaurantMenu = ({ id, latitude, longitude }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState(null);
  const [deals, setDeals] = useState(null);

  const BASE_URL = getBaseURL();

  useEffect(() => {
    fetchRestaurant();
  }, [latitude, longitude, id]);

  async function fetchRestaurant() {
    try {
      const response = await axios.get(
        `${BASE_URL}/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`,
      );

      const data = response.data;
      setRestaurant(data?.data?.cards[2]?.card?.card);
      setCategories(
        data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards,
      );
      setDeals(
        data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return [restaurant, categories, deals];
};

export default useRestaurantMenu;
