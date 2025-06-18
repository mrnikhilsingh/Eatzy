import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../components/Footer";

describe("footer component", () => {
  it("should render footer component", () => {
    render(<Footer />);

    const headerText = screen.getByText("Company Name");

    expect(headerText).toBeInTheDocument();
  });

  it("should render all headings", () => {
    render(<Footer />);

    const headings = screen.getAllByRole("heading");

    expect(headings.length).not.toBe(3);
  });
});
