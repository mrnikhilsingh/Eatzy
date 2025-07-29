import getBaseURL from "../utils/getBaseURL";

const BASE_URL = getBaseURL();

export const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const UPDATE = `${BASE_URL}/dapi/restaurants/list/update`;

export const WHATS_ON_YOUR_MIND_IMG_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const LOCATION = `${BASE_URL}/dapi/misc/place-autocomplete?input=`;
