import axios from "axios";
import { useEffect, useState } from "react";
import getBaseURL from "../utils/getBaseURL";

const useFetchPlaceAddr = (placeId) => {
  const [data, setData] = useState(null);
  const [latitude, setLatitute] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = getBaseURL();

  useEffect(() => {
    if (placeId) {
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
      setLatitute(data?.data[0]?.geometry?.location?.lat);
      setLongitude(data?.data[0]?.geometry?.location?.lng);
    } catch (error) {
      console.log("Error Fetching Address:", error);
      setError(error);
    }
  }

  return { data, latitude, longitude, error };
};

export default useFetchPlaceAddr;
