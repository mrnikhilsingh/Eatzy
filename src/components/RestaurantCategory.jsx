import { useState } from "react";

import ItemList from "./ItemList";

const RestaurantCategory = ({ itemCategory }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  // check if it is not a nested category
  if (itemCategory?.card?.card?.itemCards) {
    return (
      <div className="mb-1 rounded-md border border-gray-300 px-4 py-3">
        {/* Accordion Head */}
        <div className="flex cursor-pointer items-center justify-between">
          <p className="text-xl font-bold">
            {itemCategory?.card?.card?.title}(
            {itemCategory?.card?.card?.itemCards?.length})
          </p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="17.5"
              viewBox="0 0 448 512"
            >
              <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </span>
        </div>
        {/* Accordion Body */}
        {itemCategory?.card?.card?.itemCards?.map((item) => {
          return (
            <ItemList
              key={item?.card?.info?.id}
              item={item}
              isReadMore={isReadMore}
            />
          );
        })}
      </div>
    );
  }
  //   if nested category return this
  return (
    <div className="mb-1 rounded-md border border-gray-300 px-4 py-3">
      {/* Accordion Head */}
      <p className="text-xl font-bold">{itemCategory?.card?.card?.title}</p>
      {/* Accordion Sub Head */}
      {itemCategory?.card?.card?.categories?.map((subCategory) => {
        return (
          <div key={subCategory?.categoryId}>
            <div className="flex cursor-pointer items-center justify-between pt-4">
              <p className="text-md font-bold">
                {subCategory?.title}({subCategory?.itemCards?.length})
              </p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  width="16.5"
                  viewBox="0 0 448 512"
                >
                  <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </span>
            </div>
            {/* Accordion Body */}
            {subCategory.itemCards.map((item) => {
              return (
                <ItemList
                  key={item?.card?.info?.id}
                  item={item}
                  isReadMore={isReadMore}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantCategory;
