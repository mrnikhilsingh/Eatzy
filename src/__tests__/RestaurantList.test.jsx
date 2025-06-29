import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RestaurantList from "../components/RestaurantList";
import mockData from "../__mocks__/restaurantMockData.json";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const mockRestaurants =
  mockData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;

let filtered = mockRestaurants;

vi.mock("../hooks/useRestaurant", () => ({
  default: () => ({
    restaurants: mockRestaurants,
    filteredRestaurants: filtered,
    setFilteredRestaurants: (newValue) => {
      filtered = newValue;
    },
  }),
}));

beforeEach(() => {
  filtered = mockRestaurants;
});

describe("Restaurant List component", () => {
  it("should render restaurantList component", () => {
    render(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );
  });

  it("should render top rated button", () => {
    render(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );

    const topRatedButton = screen.getByRole("button", { name: "Top Rated" });

    expect(topRatedButton).toBeInTheDocument();
  });

  it("should render search input and button", () => {
    render(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search for restaurants...",
    );

    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("should render correct number of restaurant cards", () => {
    render(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );

    const restaurantCards = screen.getAllByTestId("resCard");

    expect(restaurantCards.length).toBe(4);
  });

  it("should filter top rated restaurants properly", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );

    // Before top rated button click
    const restaurantCardsBeforeClick = screen.getAllByTestId("resCard");
    expect(restaurantCardsBeforeClick.length).toBe(4);

    // After top rated button click
    const topRatedButton = screen.getByRole("button", { name: "Top Rated" });
    expect(topRatedButton).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(topRatedButton);

    rerender(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );

    // screen.debug(undefined, Infinity);
    const restaurantCardsAfterClick = screen.getAllByTestId("resCard");
    expect(restaurantCardsAfterClick.length).toBe(2);
  });

  it("should filter restaurantList wth searchText and updates UI", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search for restaurants...",
    );
    const searchButton = screen.getByRole("button", { name: "Search" });

    const user = userEvent.setup();
    await user.type(searchInput, "pizz");
    await user.click(searchButton);

    rerender(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>,
    );

    const restaurantCards = screen.getAllByTestId("resCard");
    expect(restaurantCards.length).toBe(3);
  });
});
