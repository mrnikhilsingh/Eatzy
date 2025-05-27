import { useParams } from "react-router";

import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";

import useRestaurantMenu from "../hooks/useRestaurantMenu";

const RestaurantDetails = () => {
  const { id } = useParams();

  // fetch restaurant menu data using custom hook
  const restaurant = useRestaurantMenu(id);

  if (restaurant === null) return <ShimmerCard />;

  return <div>{<RestaurantCard restaurant={restaurant} />}</div>;
};

export default RestaurantDetails;
