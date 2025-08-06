import { Link } from "react-router";
import { IMG_CDN_URL } from "../lib/constants";
import { useSelector } from "react-redux";

const RestaurantCard = ({ restaurant, isChains = false }) => {
  const {
    id,
    name,
    cloudinaryImageId,
    avgRating,
    aggregatedDiscountInfoV3,
    areaName,
    sla,
    cuisines,
  } = restaurant.info;

  // get city name from the redux store
  const cityName = useSelector((store) => store.city);

  // Convert spaces to '-'
  const areaNameEncoded = areaName.split(" ").join("-");
  const nameEncoded = name.split(" ").join("-");

  const style =
    "max-w-40 sm:max-w-60 shrink-0 overflow-hidden rounded-xl bg-white transition-transform hover:scale-95";

  return (
    <div
      data-testid="resCard"
      className={
        isChains
          ? style
          : "overflow-hidden rounded-xl bg-white transition-transform hover:scale-95"
      }
    >
      <Link
        to={`/restaurant/city/${cityName}/${areaNameEncoded}/${nameEncoded}/${id}`}
      >
        {/* Image Section with Gradient Overlay */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
          {/* Base Image */}
          <img
            src={IMG_CDN_URL + cloudinaryImageId}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(26,26,26,1) 5%, rgba(26,26,26,0) 40%)",
            }}
          >
            {/* Promotional Text */}
            <div className="absolute bottom-1 left-2 px-2 font-bold text-white sm:text-lg">
              {aggregatedDiscountInfoV3?.header}{" "}
              {aggregatedDiscountInfoV3?.subHeader}
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="p-2">
          <div className="flex items-start justify-between">
            <div>
              {/* Restaurant Name */}
              <h3 className="font-bold text-gray-800 sm:text-lg">{name}</h3>

              {/* Rating and Delivery Time */}
              <div className="mt-1 flex items-center gap-1">
                <div className="flex items-center rounded-sm bg-green-600 px-0.5 text-xs text-white sm:px-1">
                  <span className="text-xs">{avgRating}</span>
                  <span className="text-xs">★</span>
                </div>
                <span className="text-sm font-semibold">•</span>
                <span className="text-sm font-semibold">{sla?.slaString}</span>
              </div>

              {/* Restaurant Categories */}
              <p className="mt-1 text-sm font-semibold text-gray-500 sm:text-base">
                {cuisines.length > 2
                  ? `${cuisines.slice(0, 2).join(", ")}, ...`
                  : cuisines.join(", ")}
              </p>
              <p className="text-sm font-semibold text-gray-500 sm:text-base">
                {areaName}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
