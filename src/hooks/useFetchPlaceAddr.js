import axios from "axios";
import { useEffect, useState } from "react";
import getBaseURL from "../utils/getBaseURL";
import { useDispatch } from "react-redux";
import { setCityName } from "../store/citySlice";

const useFetchPlaceAddr = (placeId) => {
  const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const BASE_URL = getBaseURL();

  useEffect(() => {
    // cleanup on place change
    setData(null);
    setLatitude(null);
    setLongitude(null);
    setError(null);
    if (placeId !== undefined && placeId !== null && placeId !== "") {
      fetchPlaceAddr(placeId);
    }
  }, [placeId]);

  async function fetchPlaceAddr(id) {
    try {
      const response = await axios.get(
        `${BASE_URL}/dapi/misc/address-recommend?place_id=${id}`,
      );
      const data = response.data;

      setData(data?.data[0]);
      setLatitude(data?.data[0]?.geometry?.location?.lat);
      setLongitude(data?.data[0]?.geometry?.location?.lng);

      // finding the state name
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
    } catch (error) {
      console.log("Error Fetching Address:", error);
      setError(error);
    }
  }

  return { data, latitude, longitude, error };
};

export default useFetchPlaceAddr;
