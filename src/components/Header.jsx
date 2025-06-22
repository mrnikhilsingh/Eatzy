import { useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

import logo from "../assets/images/restaurant-logo.jpg";

import useOnlineStatus from "../hooks/useOnlineStatus";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isOnline = useOnlineStatus();

  const cartItems = useSelector((store) => store.cart);

  return (
    <nav className="relative shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex max-w-16 items-center py-1">
            <img className="w-full" src={logo} alt="logo" />
            {/* <span className="text-xl font-bold">Brand</span> */}
          </div>

          {/* Desktop Navigation */}
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
              <span>Online Status : {isOnline ? "🟢" : "🔴"}</span>
            </div>
          </div>
          <div className="hidden items-center justify-center gap-5 md:block md:flex">
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
                <span className="absolute -top-1 -right-1 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-orange-700 text-xs font-bold text-white">
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
          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Shopping Cart Icon Mobile */}
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

      {/* Mobile Menu */}
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
            <span className="block px-3 py-2">
              Online Status : {isOnline ? "🟢" : "🔴"}
            </span>
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
  );
};

export default Header;
