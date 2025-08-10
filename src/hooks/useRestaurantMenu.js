import axios from "axios";
import getBaseURL from "../utils/getBaseURL";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = getBaseURL();

const fetchRestaurantMenu = async ({ id, latitude, longitude }) => {
  const { data } = await axios.get(
    `${BASE_URL}/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`,
  );

  return data;
};

const useRestaurantMenu = ({ id, latitude, longitude }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurantMenu", id, longitude, latitude],
    queryFn: () => fetchRestaurantMenu({ id, latitude, longitude }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const restaurant = data?.data?.cards[2]?.card?.card ?? null;
  const categories =
    data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? null;
  const deals =
    data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers ??
    null;

  return { restaurant, categories, deals, error, isLoading };
};

export default useRestaurantMenu;
