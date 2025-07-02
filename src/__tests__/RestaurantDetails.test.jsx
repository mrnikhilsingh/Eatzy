import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import RestaurantDetails from "../components/RestaurantDetails";
import Header from "../components/Header";
import mockData from "../__mocks__/restaurantMenuMockData.json";
import { Provider } from "react-redux";
import store from "../store/store";
import userEvent from "@testing-library/user-event";

const restaurant = mockData?.data?.cards[2]?.card?.card;
const categories =
  mockData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

vi.mock("../hooks/useRestaurantMenu", () => ({
  default: () => [restaurant, categories],
}));

describe("RestaurantDetais component", () => {
  it("should render component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <RestaurantDetails />
        </Provider>
      </MemoryRouter>,
    );
  });

  it("should restaurant name heading", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <RestaurantDetails />
        </Provider>
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});

describe("RestaurantCategory component", () => {
  it("should render component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <RestaurantDetails />
        </Provider>
      </MemoryRouter>,
    );

    const restaurantCategories = screen.getByTestId("resCategories");
    expect(restaurantCategories).toBeInTheDocument();

    // screen.debug(restaurantCategories);
  });

  it("should render add to cart button", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <RestaurantDetails />
        </Provider>
      </MemoryRouter>,
    );

    const addButton = screen.getAllByRole("button", { name: "ADD" });

    expect(addButton.length).not.toBe([]);
  });

  it("should add items to the cart", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
          <RestaurantDetails />
        </Provider>
      </MemoryRouter>,
    );

    const addButtons = screen.getAllByRole("button", { name: "ADD" });

    const user = userEvent.setup();
    await user.click(addButtons[0]);
    await user.click(addButtons[1]);
    await user.click(addButtons[2]);

    rerender(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
          <RestaurantDetails />
        </Provider>
      </MemoryRouter>,
    );

    const cartItemsCount = screen.getByTestId("cartItemsCount");
    expect(cartItemsCount).toBeInTheDocument();
    expect(cartItemsCount).toHaveTextContent(3);
  });
});
