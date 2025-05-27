const useFilterData = () => {
  function filterData(searchText, restaurants) {
    const filteredData = restaurants.filter((restaurant) => {
      return restaurant?.info?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });

    return filteredData;
  }

  return filterData;
};

export default useFilterData;
