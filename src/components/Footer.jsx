import { NavLink } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-4 md:gap-0">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="mb-4 text-xl font-bold">Eatzy</h3>
            <p className="mb-2 text-gray-300">123 Street Address</p>
            <p className="mb-2 text-gray-300">City, State 12345</p>
            <p className="text-gray-300">contact@eatzy.com</p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-bold">Stay Updated</h3>
            <p className="mb-4 text-gray-300">Subscribe to our newsletter</p>
            <div className="flex max-w-80 md:max-w-full">
              <input
                type="email"
                placeholder="Your email"
                className="w-full min-w-0 flex-1 rounded-l bg-gray-700 py-3 pl-3 text-white focus:outline-none"
              />
              <button className="flex-shrink-0 rounded-r bg-blue-600 px-4 hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://github.com/mrnikhilsingh"
            className="text-gray-300 hover:text-white"
            target="_blank"
          >
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com/nikhilsingh818"
            className="text-gray-300 hover:text-white"
            target="_blank"
          >
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/nikhilsingh818"
            className="text-gray-300 hover:text-white"
            target="_blank"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" viewBox="0 0 448 512" fill="currentColor">
              <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-300">
            © {currentYear} Eatzy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
