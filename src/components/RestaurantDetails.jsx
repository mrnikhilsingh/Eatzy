import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";

const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  async function fetchRestaurant() {
    try {
      const response = await axios.get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.4717584&lng=77.1315321&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`,
      );

      const data = response.data;
      setRestaurant(data?.data?.cards[2]?.card?.card);

      //   console.log(data.data.cards[2].card.card);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if (restaurant === null) return <ShimmerCard />;

  return <div>{<RestaurantCard restaurant={restaurant} />}</div>;
};

export default RestaurantDetails;
