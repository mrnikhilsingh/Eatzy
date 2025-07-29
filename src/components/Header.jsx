import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/locationSlice";

import useFetchPlaces from "../hooks/useFetchPlaces";
import useFetchPlaceAddr from "../hooks/useFetchPlaceAddr";

import logo from "../assets/images/eatzy-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [placeID, setPlaceID] = useState("");
  const [placeAddr, setPlaceAddr] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart);

  // fetch place lists based on search input
  const { placesList, isLoading, setIsLoading, placeError } =
    useFetchPlaces(debouncedInput);
  const { latitude, longitude } = useFetchPlaceAddr(placeID);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 1000); // 1000ms debounce

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(setLocation({ latitude, longitude }));
    }
  }, [latitude, longitude, dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // handle place change
  const handleClick = (id, addr) => {
    setPlaceID(id);
    setPlaceAddr(addr);
    setIsSidebarOpen(!isSidebarOpen);
  };

  // handle input change when user searches for place
  const handleInputChange = (e) => {
    setIsLoading(true);
    setSearchInput(e.target.value);
  };

  return (
    <div id="navbar" className="relative">
      {/* overlay container */}
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        id="overlay"
        className={`${isSidebarOpen ? "block" : "hidden"} absolute z-10 h-screen w-screen cursor-pointer bg-black opacity-80`}
      ></div>
      {/* sidebar container */}
      <div
        id="sidebar"
        className={`absolute ${isSidebarOpen ? "left-0" : "-left-full"} z-20 h-screen w-full overflow-hidden overflow-y-auto bg-white p-3 transition-all duration-500 sm:w-sm md:w-md`}
      >
        <span
          onClick={toggleSidebar}
          id="close_button"
          className="cursor-pointer"
        >
          <svg
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </span>
        <div
          id="search_input"
          className="mt-8 h-12 border border-gray-300 font-semibold shadow-md"
        >
          <input
            value={searchInput}
            onChange={handleInputChange}
            type="text"
            placeholder="Search for area, street name..."
            className="h-full w-full px-3 outline-none"
          />
        </div>
        <div id="suggested_places" className="mt-8 p-4">
          {isLoading ? (
            <div className="mt-15 flex flex-row items-center justify-center gap-2">
              <div className="h-4 w-4 animate-bounce rounded-full bg-orange-500"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-orange-500 [animation-delay:-.3s]"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-orange-500 [animation-delay:-.5s]"></div>
            </div>
          ) : placeError ? (
            <p className="flex items-center rounded-lg border border-red-300 bg-red-50 px-4 py-2 font-semibold text-red-800">
              <svg
                className="shirnk-0 me-2 mt-1 h-4 w-4 justify-center"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
              </svg>
              <span>
                {placeError && placeError.message
                  ? placeError.message
                  : "An error occurred!"}
              </span>
            </p>
          ) : (
            placesList &&
            placesList?.map((place, index) => {
              const isLastIndex = index === placesList?.length - 1;
              return (
                <div
                  onClick={() =>
                    handleClick(place?.place_id, place?.structured_formatting)
                  }
                  key={place?.place_id}
                  id="place_details"
                  className="group mt-5 flex cursor-pointer gap-x-2 first:mt-0"
                >
                  <span className="block w-4 shrink-0 pt-1.5">
                    <svg viewBox="0 0 384 512">
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                  </span>

                  <div
                    className={`${!isLastIndex && "border-b-1 border-dashed border-gray-400"} w-full pb-5`}
                  >
                    <p
                      id="place_name"
                      className="font-semibold group-hover:text-orange-600"
                    >
                      {place?.structured_formatting?.main_text}
                    </p>
                    <p
                      id="place_address"
                      className="text-sm font-semibold text-gray-500"
                    >
                      {place?.structured_formatting?.secondary_text}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <nav className="fixed top-0 left-0 z-20 w-full border-b border-white/30 bg-white/40 shadow-md backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0 items-center gap-x-3 sm:gap-x-8">
              {/* Logo */}
              <div className="max-w-12 py-2 sm:max-w-14">
                <img className="w-full" src={logo} alt="logo" />
              </div>
              <div
                onClick={toggleSidebar}
                className="group flex max-w-[150px] cursor-pointer items-center gap-x-2 text-xs sm:max-w-2xs sm:text-base"
              >
                <p className="line-clamp-1 font-bold underline decoration-2 underline-offset-8 group-hover:text-orange-500">
                  {Object.keys(placeAddr).length === 0
                    ? "Gurgaon"
                    : placeAddr?.main_text.slice(0, 20)}
                </p>
                <div className="flex items-center justify-center gap-x-1">
                  <p className="line-clamp-1 text-gray-700">
                    {Object.keys(placeAddr).length === 0
                      ? "Gurgaon, India"
                      : placeAddr?.secondary_text.slice(0, 50)}
                  </p>
                  <span className="w-3.5 shrink-0">
                    <svg fill="#f54900" viewBox="0 0 448 512">
                      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold text-orange-500 underline" : "text-black"} rounded-md px-3 py-2 font-medium decoration-2 underline-offset-4 transition-all hover:text-orange-500 hover:underline`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold text-orange-500 underline" : "text-black"} rounded-md px-3 py-2 font-medium decoration-2 underline-offset-4 transition-all hover:text-orange-500 hover:underline`
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold text-orange-500 underline" : "text-black"} rounded-md px-3 py-2 font-medium decoration-2 underline-offset-4 transition-all hover:text-orange-500 hover:underline`
                    }
                  >
                    Contact
                  </NavLink>
                </div>
              </div>
              <div className="hidden items-center justify-center gap-5 md:flex">
                {/* Shopping Cart Icon */}
                <NavLink
                  to="/cart"
                  className="relative rounded-md px-3 py-2 font-medium transition-all hover:scale-110"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  {/* Cart Item Count Badge */}
                  {cartItems.length > 0 && (
                    <span
                      data-testid="cartItemsCount"
                      className="absolute -top-1 -right-1 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-orange-700 text-xs font-bold text-white"
                    >
                      {cartItems.length > 99 ? "99+" : cartItems.length}
                    </span>
                  )}
                </NavLink>
                <button
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                  className="hidden cursor-pointer rounded-md bg-orange-500 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-orange-600 md:block"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              {/* Shopping Cart Icon Mobile */}
              <NavLink
                to="/cart"
                className="relative rounded-md py-2 font-medium transition-all hover:scale-110"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {/* Cart Item Count Badge */}
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-orange-700 text-xs font-bold text-white">
                    {cartItems.length > 99 ? "99+" : cartItems.length}
                  </span>
                )}
              </NavLink>
              <button
                onClick={toggleMenu}
                className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 transition-all focus:outline-none"
              >
                {isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pb-5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "font-semibold text-orange-500 underline" : "text-black"} block rounded-md px-3 py-2 font-medium decoration-2 underline-offset-4 transition-all hover:text-orange-500 hover:underline`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "font-semibold text-orange-500 underline" : "text-black"} block rounded-md px-3 py-2 font-medium decoration-2 underline-offset-4 transition-all hover:text-orange-500 hover:underline`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${isActive ? "font-semibold text-orange-500 underline" : "text-black"} block rounded-md px-3 py-2 font-medium decoration-2 underline-offset-4 transition-all hover:text-orange-500 hover:underline`
                }
              >
                Contact
              </NavLink>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="my-2 w-full cursor-pointer rounded-md bg-orange-500 px-3 py-2 text-left font-semibold text-white transition-colors hover:bg-orange-600"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
