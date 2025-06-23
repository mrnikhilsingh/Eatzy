const ShimmerRestaurantDetail = () => {
  return (
    <div className="mx-auto md:max-w-3xl">
      {/* Restaurant Name */}
      <div className="relative h-9 w-md overflow-hidden rounded-md bg-gray-200">
        <div className="absolute inset-0">
          <div
            className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite linear",
            }}
          />
        </div>
      </div>
      {/* Restaurant Details */}
      <div className="mt-5 rounded-lg bg-white p-4 shadow-sm">
        <div className="relative h-5 w-xs overflow-hidden rounded-md bg-gray-200">
          <div className="absolute inset-0">
            <div
              className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
              }}
            />
          </div>
        </div>
        <div className="relative mt-2 h-5 w-36 overflow-hidden rounded-md bg-gray-200">
          <div className="absolute inset-0">
            <div
              className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
              }}
            />
          </div>
        </div>
        <div className="relative mt-2 h-5 w-50 overflow-hidden rounded-md bg-gray-200">
          <div className="absolute inset-0">
            <div
              className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
              }}
            />
          </div>
        </div>
      </div>

      {/* Recommended Items */}
      <div className="mt-10 flex justify-between gap-10 rounded-lg bg-white p-4 shadow-sm">
        {/* Items details */}
        <div>
          <div className="relative h-7 w-sm overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0">
              <div
                className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
            </div>
          </div>
          <div className="relative mt-4 h-5 w-56 overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0">
              <div
                className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
            </div>
          </div>
          <div className="relative mt-2 h-5 w-36 overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0">
              <div
                className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
            </div>
          </div>
          <div className="relative mt-2 h-5 w-56 overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0">
              <div
                className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
            </div>
          </div>
        </div>
        {/* item image */}
        <div>
          <div className="relative h-full w-3xs overflow-hidden rounded-md bg-gray-200">
            <div className="absolute inset-0">
              <div
                className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerRestaurantDetail;
