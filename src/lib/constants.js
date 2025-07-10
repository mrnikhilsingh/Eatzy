import getBaseURL from "../utils/getBaseURL";

const BASE_URL = getBaseURL();

export const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const RESTAURANT_API_URL = `${BASE_URL}/dapi/restaurants/list/v5?lat=28.4717584&lng=77.1315321&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

export const UPDATE = `${BASE_URL}/dapi/restaurants/list/update`;

export const WHATS_ON_YOUR_MIND_IMG_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
