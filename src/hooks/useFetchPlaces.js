import { useEffect, useState } from "react";
import axios from "axios";
import getBaseURL from "../utils/getBaseURL";

const useFetchPlaces = (place) => {
  const [placesList, setPlacesList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeError, setPlaceError] = useState(null);

  const BASE_URL = getBaseURL();

  useEffect(() => {
    setPlaceError(null);
    if (!place) {
      setIsLoading(false);
      setPlacesList(null);
      return;
    }
    fetchPlaces(place);
  }, [place]);

  async function fetchPlaces(place) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/dapi/misc/place-autocomplete?input=${place}`,
      );
      const data = response.data;

      setPlacesList(data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setPlaceError(error);
      console.log("Error Fetching place Data:", error);
    }
  }

  return { placesList, isLoading, setIsLoading, placeError };
};

export default useFetchPlaces;
