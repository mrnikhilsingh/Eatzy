import { useSelector } from "react-redux";

import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";

import useRestaurant from "../hooks/useRestaurant";
import { WHATS_ON_YOUR_MIND_IMG_CDN } from "../lib/constants";

const RestaurantList = () => {
  const { latitude, longitude } = useSelector((store) => store.location);

  const {
    data,
    whatsOnYourMind,
    topRestaurantChains,
    restaurants,
    filteredRestaurants,
    setFilteredRestaurants,
    error,
  } = useRestaurant({ latitude, longitude });

  // random array to multiply and map shimmer card
  const randomArray = new Array(8).fill("");

  // filter top rated restaurants
  const handleClick = () => {
    const filteredRestaurants = restaurants.filter(
      (restaurant) => restaurant.info.avgRating >= 4.5,
    );
    setFilteredRestaurants(filteredRestaurants);
  };

  if (error) {
    return (
      <div id="error_container" className="mx-auto max-w-lg pt-20 pb-96">
        <div className="relative rounded border border-red-500 bg-red-100 px-4 py-3 text-red-700">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20">
      {/* what's on your mind */}

      {whatsOnYourMind && (
        <section id="what's on your mind" className="mx-auto max-w-[1060px]">
          <h1 className="font-bold text-gray-800 md:text-2xl">
            What's on your mind?
          </h1>
          <div className="mt-2 grid grid-flow-col grid-rows-2 overflow-hidden overflow-x-auto sm:grid-rows-1">
            {whatsOnYourMind?.map((item) => (
              <div key={item?.id} className="w-24 snap-center sm:w-36">
                <img
                  className="h-full w-full mix-blend-darken"
                  src={WHATS_ON_YOUR_MIND_IMG_CDN + item?.imageId}
                  alt={item?.action?.text}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <hr className="mx-auto my-10 h-0.5 max-w-[1060px] rounded-md border-0 bg-gray-300"></hr>
        </section>
      )}

      {/* top restaurant chains */}

      <section id="top-restaurant-chains" className="mx-auto max-w-[1060px]">
        <h1 className="font-bold text-gray-800 md:text-2xl">
          {!topRestaurantChains ? (
            <div
              className="h-6 w-3/5 animate-pulse rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:w-2/5"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite linear",
              }}
            />
          ) : (
            data?.cards[1]?.card?.card?.header?.title
          )}
        </h1>
        <div className="mt-5 flex flex-nowrap gap-x-3 overflow-hidden overflow-x-auto">
          {!topRestaurantChains
            ? randomArray.map((_, index) => {
                return <ShimmerCard key={index} />;
              })
            : topRestaurantChains?.map((restaurant) => (
                <RestaurantCard
                  restaurant={restaurant}
                  key={restaurant.info.id}
                  isChains={true}
                />
              ))}
        </div>
      </section>

      <hr className="mx-auto my-10 h-0.5 max-w-[1060px] rounded-md border-0 bg-gray-300"></hr>

      {/* restaurant with online food delivery */}
      <section
        id="restaurant-with-onine-food-delivery"
        className="mx-auto mt-10 max-w-[1060px] gap-8"
      >
        <h1 className="font-bold text-gray-800 md:text-2xl">
          {!restaurants ? (
            <div
              className="h-6 w-3/5 animate-pulse rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:w-2/4"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite linear",
              }}
            />
          ) : (
            data?.cards[2]?.card?.card?.title
          )}
        </h1>

        {!restaurants ? (
          <div
            className="mt-3 h-10 w-28 animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite linear",
            }}
          />
        ) : (
          <button
            onClick={handleClick}
            className="mt-3 cursor-pointer rounded-md bg-orange-500 px-3 py-1 font-semibold text-white transition-colors hover:bg-orange-600 md:px-4 md:py-1.5"
          >
            Top Rated
          </button>
        )}
      </section>

      {/* main restaurant cards */}
      <section
        id="restaurant-list"
        className="mx-auto mt-8 grid max-w-[1060px] grid-cols-2 flex-wrap justify-between gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-x-3 md:grid-cols-4 lg:gap-x-8"
      >
        {!restaurants
          ? randomArray.map((_, index) => {
              return <ShimmerCard key={index} />;
            })
          : filteredRestaurants?.map((restaurant) => {
              return (
                <RestaurantCard
                  restaurant={restaurant}
                  key={restaurant.info.id}
                />
              );
            })}
      </section>
    </div>
  );
};

export default RestaurantList;
