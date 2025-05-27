import { Link } from "react-router";
import { IMG_CDN_URL } from "../lib/constants";

const RestaurantCard = ({ restaurant }) => {
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

  // Convert spaces to '-'
  const areaNameEncoded = areaName.split(" ").join("-");
  const nameEncoded = name.split(" ").join("-");

  return (
    <div className="w-[240px] overflow-hidden rounded-lg bg-white transition-transform hover:scale-95">
      <Link
        to={`/restaurant/city/gurgaon/${areaNameEncoded}/${nameEncoded}/${id}`}
      >
        {/* Image Section with Gradient Overlay */}
        <div className="relative">
          {/* Base Image */}
          <img
            src={IMG_CDN_URL + cloudinaryImageId}
            alt={name}
            className="h-40 w-full rounded-2xl object-cover"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(0deg, rgba(26,26,26,1) 5%, rgba(26,26,26,0) 40%)",
            }}
          >
            {/* Promotional Text */}
            <div className="absolute bottom-1 left-2 px-2 text-lg font-bold text-white">
              {aggregatedDiscountInfoV3?.header}{" "}
              {aggregatedDiscountInfoV3?.subHeader}
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="p-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

              {/* Rating and Delivery Time */}
              <div className="mt-1 flex items-center gap-1">
                <div className="flex items-center rounded-sm bg-green-600 px-1 text-xs text-white">
                  <span className="text-xs">{avgRating}</span>
                  <span className="text-xs">★</span>
                </div>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{sla?.slaString}</span>
              </div>

              {/* Restaurant Categories */}
              <p className="mt-1 text-sm text-gray-500">
                {cuisines.length > 2
                  ? `${cuisines.slice(0, 2).join(", ")}, ...`
                  : cuisines.join(", ")}
              </p>
              <p className="text-sm text-gray-500">{areaName}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
