import { useState } from "react";

import ItemList from "./ItemList";

const RestaurantCategory = ({ itemCategory, activeIndex, setActiveIndex }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [activeSubIndex, setActiveSubIndex] = useState(null);

  // check if it is not a nested category
  if (itemCategory?.card?.card?.itemCards) {
    return (
      <div className="mb-1 rounded-md border border-gray-300 px-4 py-3">
        {/* Accordion Head  */}
        <div
          onClick={setActiveIndex}
          className="flex cursor-pointer items-center justify-between"
        >
          <p className="text-lg font-bold sm:text-xl">
            {itemCategory?.card?.card?.title}(
            {itemCategory?.card?.card?.itemCards?.length})
          </p>
          <span
            className={`${activeIndex ? "rotate-180" : ""} flex gap-2 transition-transform duration-300`}
          >
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
        {
          // Accordion Body
          !!activeIndex && (
            <ItemList
              items={itemCategory?.card?.card?.itemCards}
              isReadMore={isReadMore}
            />
          )
        }
      </div>
    );
  }
  //  nested category
  return (
    <div className="mb-1 rounded-md border border-gray-300 px-4 py-3">
      {/* Accordion Head */}
      <p className="text-xl font-bold">{itemCategory?.card?.card?.title}</p>
      {/* Accordion Sub Head */}
      {itemCategory?.card?.card?.categories?.map((subCategory, subIndex) => {
        return (
          <div key={subCategory?.categoryId}>
            <div
              onClick={() =>
                setActiveSubIndex(activeSubIndex === subIndex ? null : subIndex)
              }
              className="flex cursor-pointer items-center justify-between pt-4"
            >
              <p className="text-md font-bold">
                {subCategory?.title}({subCategory?.itemCards?.length})
              </p>
              <span
                className={`${activeSubIndex === subIndex ? "rotate-180" : ""} transition-transform duration-300`}
              >
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
            {
              /* Accordion Body */
              activeSubIndex === subIndex && (
                <ItemList
                  items={subCategory?.itemCards}
                  isReadMore={isReadMore}
                />
              )
            }
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantCategory;
