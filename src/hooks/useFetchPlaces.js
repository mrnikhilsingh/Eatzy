import { useEffect, useState } from "react";
import axios from "axios";
import getBaseURL from "../utils/getBaseURL";

const useFetchPlaces = (place) => {
  const [placesList, setPlacesList] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = getBaseURL();

  useEffect(() => {
    if (!place) return;
    fetchPlaces(place);
  }, [place]);

  async function fetchPlaces(place) {
    try {
      const response = await axios.get(
        `${BASE_URL}/dapi/misc/place-autocomplete?input=${place}`,
      );
      const data = response.data;

      setPlacesList(data?.data);
    } catch (error) {
      console.log("Error Fetching place Data:", error);
      setError(error);
    }
  }

  return { placesList, error };
};

export default useFetchPlaces;
