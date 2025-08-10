import axios from "axios";
import getBaseURL from "../utils/getBaseURL";
import { useDispatch } from "react-redux";
import { setCityName } from "../store/citySlice";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = getBaseURL();

const fetchPlaceAddr = async (placeId) => {
  const { data } = await axios.get(
    `${BASE_URL}/dapi/misc/address-recommend?place_id=${placeId}`,
  );
  return data;
};

const useFetchPlaceAddr = (placeId) => {
  const dispatch = useDispatch();

  const { data, error } = useQuery({
    queryKey: ["placeAddr", placeId],
    queryFn: () => fetchPlaceAddr(placeId),
    enabled: !!placeId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const latitude = data?.data[0]?.geometry?.location?.lat ?? null;
  const longitude = data?.data[0]?.geometry?.location?.lng ?? null;

  const addressComponents = data?.data[0]?.address_components;
  let stateObj = null;
  if (Array.isArray(addressComponents)) {
    [stateObj] = addressComponents.filter(
      (comp) => comp?.types && comp.types[0]?.includes("state"),
    );
  }

  // set city name for dynamic url
  if (stateObj && stateObj.long_name) {
    dispatch(setCityName(stateObj.long_name));
  }

  return { data, latitude, longitude, error };
};

export default useFetchPlaceAddr;
