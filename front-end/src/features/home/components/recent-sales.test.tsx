import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RecentSales } from "./recent-sales";
import "@testing-library/jest-dom/vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { useGetActivitiesByEventQuery } from "@/queries/user-activity";
import { UseQueryResult } from "@tanstack/react-query";
import { ActivityDataType } from "@/services/user-activity";

// Set up a mock server to handle API requests
const server = setupServer(
  http.get("/api/activities", () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          userId: "user-1",
          event: "PURCHASE",
          metadata: {
            orderId: "order-1",
            paymentMethod: "credit-card",
            amount: 10.99,
          },
        },
        {
          id: 2,
          userId: "user-2",
          event: "PURCHASE",
          metadata: {
            orderId: "order-2",
            paymentMethod: "paypal",
            amount: 5.99,
          },
        },
      ],
    });
  }),
);

vi.mock("@/components/spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock the useGetActivitiesByEventQuery hook
vi.mock("@/queries/user-activity", () => ({
  useGetActivitiesByEventQuery: vi.fn(() => ({
    data: {
      data: [
        {
          id: 1,
          userId: "user-1",
          event: "PURCHASE",
          metadata: {
            orderId: "order-1",
            paymentMethod: "credit-card",
            amount: 10.99,
          },
        },
        {
          id: 2,
          userId: "user-2",
          event: "PURCHASE",
          metadata: {
            orderId: "order-2",
            paymentMethod: "paypal",
            amount: 5.99,
          },
        },
      ],
    },
    isPending: false,
  })),
}));

describe("RecentSales component", () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it("renders a list of recent sales", async () => {
    const { getByText } = render(<RecentSales />);
    await waitFor(() => {
      expect(getByText("user-1")).toBeInTheDocument();
      expect(getByText("user-2")).toBeInTheDocument();
      expect(getByText("+$10.99")).toBeInTheDocument();
      expect(getByText("+$5.99")).toBeInTheDocument();
    });
  });

  it("renders a spinner while data is pending", async () => {
    vi.mocked(useGetActivitiesByEventQuery).mockImplementationOnce(
      () =>
        ({
          data: undefined,
          isPending: true,
        }) as UseQueryResult<ActivityDataType, Error>,
    );
    const { getByTestId } = render(<RecentSales />);
    await waitFor(() => {
      expect(getByTestId("spinner")).toBeInTheDocument();
    });
  });

  it("renders an empty list when no data is available", async () => {
    vi.mocked(useGetActivitiesByEventQuery).mockImplementationOnce(
      () =>
        ({
          data: undefined,
          isPending: false,
        }) as UseQueryResult<ActivityDataType, Error>,
    );
    const { queryByText } = render(<RecentSales />);
    await waitFor(() => {
      expect(queryByText("user-1")).not.toBeInTheDocument();
      expect(queryByText("user-2")).not.toBeInTheDocument();
    });
  });
});
