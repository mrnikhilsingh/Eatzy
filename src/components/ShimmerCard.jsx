const ShimmerCard = () => {
  return (
    <div className="w-[240px] overflow-hidden rounded-lg bg-white shadow-md">
      {/* Shimmer Image Section */}
      <div className="relative h-32 overflow-hidden rounded-t-lg bg-gray-200">
        <div className="absolute inset-0">
          <div
            className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 3s infinite linear",
            }}
          />
        </div>
      </div>

      {/* Shimmer Content Section */}
      <div className="p-3">
        {/* Restaurant Name */}
        <div className="relative mb-3 h-6 w-2/3 overflow-hidden rounded-md bg-gray-200">
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

        {/* Rating and Time */}
        <div className="mb-3 flex items-center gap-2">
          <div className="relative h-4 w-12 overflow-hidden rounded-sm bg-gray-200">
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
          <div className="relative h-4 w-20 overflow-hidden rounded-sm bg-gray-200">
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

        {/* Categories */}
        <div className="relative mb-2 h-4 w-full overflow-hidden rounded-md bg-gray-200">
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

        {/* Location */}
        <div className="relative h-4 w-1/2 overflow-hidden rounded-md bg-gray-200">
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
  );
};

export default ShimmerCard;
