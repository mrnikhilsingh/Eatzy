import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../components/Footer";
import { MemoryRouter } from "react-router";

describe("footer component", () => {
  it("should render footer component", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const headerText = screen.getByText("Company Name");

    expect(headerText).toBeInTheDocument();
  });

  it("should render all headings", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const headings = screen.getAllByRole("heading");

    expect(headings.length).not.toBe(3);
  });
});
