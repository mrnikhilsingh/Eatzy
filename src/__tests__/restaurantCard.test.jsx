import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RestaurantCard from "../components/RestaurantCard";
import MOCK_DATA from "../__mocks__/restaurantCardMockData.json";
import { MemoryRouter } from "react-router";

describe("Restaurant Card", () => {
  it("should render restaurant card", () => {
    render(
      <MemoryRouter>
        <RestaurantCard restaurant={MOCK_DATA} />
      </MemoryRouter>,
    );

    const restaurantName = screen.getByRole("heading", { name: "Subway" });

    expect(restaurantName).toBeInTheDocument();
  });

  it("should render image on card", () => {
    render(
      <MemoryRouter>
        <RestaurantCard restaurant={MOCK_DATA} />
      </MemoryRouter>,
    );

    const restaurantImage = screen.getByAltText("Subway");

    expect(restaurantImage).toBeInTheDocument();
  });

  it("should render link", () => {
    render(
      <MemoryRouter>
        <RestaurantCard restaurant={MOCK_DATA} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });
});
