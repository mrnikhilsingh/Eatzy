import useFilterData from "../hooks/useFilterData";

const SearchButton = ({
  searchText,
  setSearchText,
  restaurants,
  setFilteredRestaurants,
}) => {
  // useFilterData returns a function to filter data
  const filterData = useFilterData();

  return (
    <div className="relative flex max-w-sm flex-nowrap">
      <input
        type="text"
        placeholder="Search for restaurants..."
        className="mr-2 rounded-md bg-white px-3 py-2 text-sm text-gray-600 outline-none md:px-4 md:text-base"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />

      {/* Search Button */}
      <button
        onClick={() => {
          const filteredData = filterData(searchText, restaurants);
          setFilteredRestaurants(filteredData);
        }}
        className="cursor-pointer rounded-md bg-orange-500 px-3 py-1 font-semibold text-white transition-colors hover:bg-orange-600 md:px-4 md:py-1.5"
      >
        Search
      </button>

      {/* Optional Recent Searches Dropdown (Can be shown/hidden based on UI state) */}
      <div className="absolute top-full right-0 left-0 z-10 mt-1 hidden rounded-md border border-gray-200 bg-white shadow-lg">
        <ul className="py-1">
          <li className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
            <span className="mr-2 text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Recent search 1
          </li>
          <li className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
            <span className="mr-2 text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Recent search 2
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchButton;
