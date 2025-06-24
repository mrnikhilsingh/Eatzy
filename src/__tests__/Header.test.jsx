import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../store/store";
import { MemoryRouter } from "react-router";

describe("should render header", () => {
  it("should render Logo on Heaer", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const logo = screen.getByAltText("logo");

    expect(logo).toBeInTheDocument();
  });

  it("should render Home tab", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const homeTab = screen.getByRole("link", { name: "Home" });

    expect(homeTab).toBeInTheDocument();
  });

  it("should render About tab", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const aboutTab = screen.getByRole("link", { name: "About" });

    expect(aboutTab).toBeInTheDocument();
  });

  it("should render Contact tab", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const contactTab = screen.getByRole("link", { name: "Contact" });

    expect(contactTab).toBeInTheDocument();
  });

  it("should render login button", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(loginButton).toBeInTheDocument();
  });

  it("should change login button to logout on click", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: "Logout" });

    expect(logoutButton).toBeInTheDocument();
  });
});
