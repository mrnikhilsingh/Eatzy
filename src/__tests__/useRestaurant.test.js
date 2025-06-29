import { describe, expect, it } from "vitest";
import mockData from "../__mocks__/restaurantMockData.json";
import useRestaurant from "../hooks/useRestaurant";
import axios from "axios";
import { renderHook, waitFor, act } from "@testing-library/react";

// mock axios globally
vi.mock("axios");

describe("useRestaurant hook", () => {
  it("should fetch and set restaurant data", async () => {
    // mock axios resolved response
    axios.get.mockResolvedValue({ data: mockData });

    // render the hook
    const { result } = renderHook(() => useRestaurant());

    // wait for the state updates (async)
    await waitFor(() => {
      expect(result.current.restaurants).toEqual(
        mockData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      );
      expect(result.current.filteredRestaurants).toEqual(
        mockData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      );
    });
  });

  it("should handle API error", async () => {
    // mock axios rejected response
    axios.get.mockRejectedValue(new Error("Error fetching data:"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useRestaurant());

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching data:",
        expect.any(Error),
      );
    });

    await waitFor(() => {
      expect(result.current.restaurants).toBe(null);
      expect(result.current.filteredRestaurants).toBe(null);
    });

    // clean up
    consoleSpy.mockRestore();
  });

  it("should allow setting restaurant manually", async () => {
    // mock API resolved response
    axios.get.mockResolvedValue({ data: mockData });

    // render hook
    const { result } = renderHook(() => useRestaurant());

    // set restaurant data
    act(() => {
      result.current.setRestaurants(["data"]);
    });

    await waitFor(() => {
      expect(result.current.restaurants).toEqual(["data"]);
    });
  });

  it("should allow setting filteredRestaurants manually", async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useRestaurant());

    act(() => {
      result.current.setFilteredRestaurants(["data"]);
    });

    await waitFor(() => {
      expect(result.current.filteredRestaurants).toEqual(["data"]);
    });
  });
});
