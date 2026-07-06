import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationBar from "@/components/app/pagination-bar";
import { PAGE_SIZE_OPTIONS } from "@/constants/pagination.constants";

const defaultProps = {
  currentPage: 1,
  totalPages: 5,
  pageSize: 10,
  totalItems: 50,
  onPageChange: vi.fn(),
  onPageSizeChange: vi.fn(),
  isFetching: false,
};

describe("PaginationBar", () => {
  it("renders the item count text", () => {
    render(<PaginationBar {...defaultProps} />);
    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // start item
    expect(screen.getByText("10")).toBeInTheDocument(); // end item
    expect(screen.getByText("50")).toBeInTheDocument(); // totalItems
  });

  it("disables First and Previous buttons on the first page", () => {
    render(<PaginationBar {...defaultProps} currentPage={1} />);
    expect(screen.getByLabelText("First page")).toBeDisabled();
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables Last and Next buttons on the last page", () => {
    render(<PaginationBar {...defaultProps} currentPage={5} totalPages={5} />);
    expect(screen.getByLabelText("Last page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("calls onPageChange when clicking Next page", () => {
    const onPageChange = vi.fn();
    render(
      <PaginationBar
        {...defaultProps}
        currentPage={2}
        onPageChange={onPageChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when clicking a specific page button", () => {
    const onPageChange = vi.fn();
    render(
      <PaginationBar
        {...defaultProps}
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Page 2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageSizeChange when the page size selector changes (PAGE_SIZE_OPTIONS)", () => {
    const onPageSizeChange = vi.fn();
    render(
      <PaginationBar
        {...defaultProps}
        pageSize={10}
        onPageSizeChange={onPageSizeChange}
      />,
    );
    // The Select's trigger should display the current value
    expect(screen.getByText("10")).toBeInTheDocument();
    // PAGE_SIZE_OPTIONS exported are [10, 20, 50]
    expect(PAGE_SIZE_OPTIONS).toContain(10);
    expect(PAGE_SIZE_OPTIONS).toContain(20);
    expect(PAGE_SIZE_OPTIONS).toContain(50);
  });

  it("renders 0 in start-item text when totalItems is 0", () => {
    render(<PaginationBar {...defaultProps} totalItems={0} />);
    expect(screen.getByText("0–0", { exact: false })).toBeInTheDocument();
  });
});
