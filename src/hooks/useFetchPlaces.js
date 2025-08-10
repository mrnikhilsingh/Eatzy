import axios from "axios";
import getBaseURL from "../utils/getBaseURL";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = getBaseURL();

const fetchPlaces = async (place) => {
  const { data } = await axios.get(
    `${BASE_URL}/dapi/misc/place-autocomplete?input=${place}`,
  );
  return data;
};

const useFetchPlaces = (place) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["places", place],
    queryFn: () => fetchPlaces(place),
    enabled: !!place,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const placesList = data?.data ?? null;

  return { placesList, isLoading, error };
};

export default useFetchPlaces;
