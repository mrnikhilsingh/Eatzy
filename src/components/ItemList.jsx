import { IMG_CDN_URL } from "../lib/constants";

import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const ItemList = ({ items, isReadMore }) => {
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(addItem(item));
  };

  return items.map((item) => (
    <div
      key={item?.card?.info?.id}
      className="flex flex-col items-start justify-between gap-4 border-b border-gray-300 pt-4 pb-8 last:border-none sm:flex-row sm:gap-x-12"
    >
      {/* Item Details */}
      <div className="max-w-lg pt-2">
        {item?.card?.info?.isVeg ? (
          // veg symbol
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <rect
                x="1"
                y="1"
                width="22"
                height="22"
                rx="5"
                ry="5"
                fill="none"
                stroke="green"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="5" fill="green" />
            </svg>
          </p>
        ) : (
          // non-veg symbol
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <rect
                x="1"
                y="1"
                width="22"
                height="22"
                rx="5"
                ry="5"
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
              <polygon points="12,6 18,18 6,18" fill="red" />
            </svg>
          </p>
        )}
        {/* item name */}
        <p className="font-bold text-gray-600 sm:text-lg">
          {item?.card?.info?.name}
        </p>
        {/* item price */}
        <p className="flex items-center font-bold">
          {item?.card?.info?.finalPrice ? (
            <>
              <span className="pr-1 text-gray-500 line-through">
                ₹{item?.card?.info?.price / 100}
              </span>
              <span className="flex items-center gap-0.5">
                ₹{item?.card?.info?.finalPrice / 100}
                <span className="relative top-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z"
                      fill="#1BA672"
                    ></path>
                  </svg>
                </span>
              </span>
            </>
          ) : (
            <span>
              ₹
              {item?.card?.info?.price / 100 ||
                item?.card?.info?.defaultPrice / 100}
            </span>
          )}
        </p>
        {/* item ratings */}
        <p className="py-2 text-sm font-bold text-gray-500">
          {item?.card?.info?.ratings?.aggregatedRating?.rating ? (
            <>
              <span className="text-green-700">
                ★{item?.card?.info?.ratings?.aggregatedRating?.rating}
              </span>
              ({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
            </>
          ) : null}
        </p>
        {/* item description */}
        <div className="flex items-end">
          <p
            className={`${isReadMore ? "" : "line-clamp-2"} font-semibold text-gray-500`}
          >
            {item?.card?.info?.description}
          </p>
        </div>
      </div>
      {/* Item Image */}
      <div className="relative w-44 shrink-0 md:w-48">
        <div className="aspect-[4/3] overflow-hidden rounded-xl">
          {/* item image */}
          <img
            className="h-full w-full object-cover"
            src={IMG_CDN_URL + item?.card?.info?.imageId}
            alt={item?.card?.info?.name}
          />
        </div>
        <button
          onClick={() => handleClick(item)}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-1 text-lg font-bold text-green-700 shadow-sm sm:px-10"
        >
          ADD
        </button>
      </div>
    </div>
  ));
};

export default ItemList;
