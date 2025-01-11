import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { describe, it, expect, vi, afterEach } from "vitest";

import { Pagination } from "./pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    total: 50,
    lastPage: 5,
    current: 1,
    setCurrent: vi.fn(),
  };

  const mockSetCurrent = vi.fn();

  afterEach(() => {
    mockSetCurrent.mockClear();
  });

  it("renders pagination component correctly", () => {
    render(<Pagination {...defaultProps} />);

    // Check if current page is displayed
    expect(
      screen.getByText("1", { selector: 'button[aria-current="page"]' }),
    ).toBeInTheDocument();

    // Check if next pages are displayed
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} />);

    // Get the desktop previous button specifically
    const previousButton = screen.getByRole("button", {
      name: /previous/i,
      hidden: true, // to match the aria-hidden SVG button
    });
    expect(previousButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} current={5} />);

    // Get the desktop next button specifically
    const nextButton = screen.getByRole("button", {
      name: /next/i,
      hidden: true, // to match the aria-hidden SVG button
    });
    expect(nextButton).toBeDisabled();
  });

  it("calls setCurrent when clicking next button", () => {
    render(<Pagination {...defaultProps} />);

    const nextButton = screen.getByRole("button", {
      name: /next/i,
      hidden: true,
    });
    fireEvent.click(nextButton);

    expect(defaultProps.setCurrent).toHaveBeenCalledWith(2);
  });

  it("calls setCurrent when clicking previous button", () => {
    render(<Pagination {...defaultProps} current={3} />);

    const previousButton = screen.getByRole("button", {
      name: /previous/i,
      hidden: true,
    });
    fireEvent.click(previousButton);

    expect(defaultProps.setCurrent).toHaveBeenCalledWith(2);
  });

  it("calls setCurrent when clicking a specific page number", () => {
    render(<Pagination {...defaultProps} current={3} />);

    const pageButton = screen.getByRole("button", { name: "4" });
    fireEvent.click(pageButton);

    expect(defaultProps.setCurrent).toHaveBeenCalledWith(4);
  });

  it("shows correct page range for middle pages", () => {
    render(<Pagination {...defaultProps} current={3} />);

    // Use more specific queries for page numbers
    const pageButtons = screen.getAllByRole("button", {
      name: /[1-5]/,
    });

    expect(pageButtons).toHaveLength(5);
    expect(pageButtons.map((button) => button.textContent)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
  });

  it("handles desktop navigation correctly", () => {
    render(<Pagination {...defaultProps} />);

    const desktopNav = screen.getByRole("navigation");
    expect(desktopNav.parentElement?.parentElement).toHaveClass(
      "hidden sm:flex-1",
    );
  });

  it("hides pagination numbers that are out of range", () => {
    render(<Pagination {...defaultProps} current={1} />);

    const pageButtons = screen.getAllByRole("button", {
      name: /[0-9]+/,
    });

    const pageNumbers = pageButtons
      .map((button) => button.textContent)
      .filter((text) => text && !isNaN(Number(text)));

    expect(pageNumbers).not.toContain("0");
    expect(pageNumbers).not.toContain("-1");
  });
});
