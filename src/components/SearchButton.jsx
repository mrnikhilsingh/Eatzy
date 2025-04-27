const SearchButton = ({
  searchText,
  setSearchText,
  restaurants,
  setFilteredRestaurants,
}) => {
  // function to filter the searched restaurant
  function filterData(searchText, restaurants) {
    const filteredData = restaurants.filter((restaurant) => {
      return restaurant?.info?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });
    setFilteredRestaurants(filteredData);
  }

  return (
    <div className="relative max-w-sm">
      {/* Search Input Group */}
      <div className="flex items-center overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm hover:shadow">
        {/* Search Icon */}
        <div className="pl-4">
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-gray-700 outline-none"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        {/* Search Button */}
        <button
          onClick={() => {
            filterData(searchText, restaurants);
          }}
          className="cursor-pointer bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Search
        </button>
      </div>

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
