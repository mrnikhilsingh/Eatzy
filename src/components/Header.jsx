import { useState } from "react";
import { NavLink } from "react-router";

import logo from "../assets/images/restaurant-logo.jpg";

import useOnlineStatus from "../hooks/useOnlineStatus";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isOnline = useOnlineStatus();

  return (
    <nav className="shadow-sm">
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
                  `${isActive ? "border-black" : "border-white"} rounded-md border px-3 py-2 font-medium hover:border-black`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "border-black" : "border-white"} rounded-md border px-3 py-2 font-medium hover:border-black`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${isActive ? "border-black" : "border-white"} rounded-md border px-3 py-2 font-medium hover:border-black`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${isActive ? "border-black" : "border-white"} rounded-md border px-3 py-2 font-medium hover:border-black`
                }
              >
                Cart
              </NavLink>
              <span>{isOnline ? "🟢" : "🔴"}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 focus:outline-none"
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
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700"
            >
              About
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700"
            >
              Services
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
