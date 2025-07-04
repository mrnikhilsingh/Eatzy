function getBaseURL() {
  return window.location.hostname === "localhost"
    ? "https://www.swiggy.com"
    : import.meta.env.VITE_PROXY_URL;
}

export default getBaseURL;
