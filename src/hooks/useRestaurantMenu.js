import { useState, useEffect } from "react";
import axios from "axios";

const useRestaurantMenu = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  async function fetchRestaurant() {
    try {
      const response = await axios.get(
        `https://corsproxy.io/?url=https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.4717584&lng=77.1315321&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`,
      );

      const data = response.data;
      setRestaurant(data?.data?.cards[2]?.card?.card);
      setCategories(
        data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return [restaurant, categories];
};

export default useRestaurantMenu;
