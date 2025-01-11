import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RecentSignups } from "./recent-signups";
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
          metadata: {
            username: "John Doe",
            email: "john@example.com",
            signupSource: "Facebook",
          },
        },
        {
          metadata: {
            username: "Jane Doe",
            email: "jane@example.com",
            signupSource: "Google",
          },
        },
      ],
      meta: {
        total: 10,
        page: 1,
        lastPage: 2,
        hasNextPage: true,
        hasPreviousPage: false,
      },
    },
    isPending: false,
  })),
}));

describe("RecentSignups component", () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it("renders a table with data", async () => {
    const { getByText } = render(<RecentSignups />);
    await waitFor(() => {
      expect(getByText("John Doe")).toBeInTheDocument();
      expect(getByText("Jane Doe")).toBeInTheDocument();
      expect(getByText("john@example.com")).toBeInTheDocument();
      expect(getByText("jane@example.com")).toBeInTheDocument();
      expect(getByText("Facebook")).toBeInTheDocument();
      expect(getByText("Google")).toBeInTheDocument();
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
    const { getByTestId } = render(<RecentSignups />);
    await waitFor(() => {
      expect(getByTestId("spinner")).toBeInTheDocument();
    });
  });

  it("renders an empty table when no data is available", async () => {
    vi.mocked(useGetActivitiesByEventQuery).mockImplementationOnce(
      () =>
        ({
          data: {
            data: [],
            meta: {
              total: 0,
              page: 1,
              lastPage: 1,
              hasNextPage: false,
              hasPreviousPage: false,
            },
          },
          isPending: false,
        }) as unknown as UseQueryResult<ActivityDataType, Error>,
    );
    const { queryByText } = render(<RecentSignups />);
    await waitFor(() => {
      expect(queryByText("John Doe")).not.toBeInTheDocument();
      expect(queryByText("Jane Doe")).not.toBeInTheDocument();
    });
  });

  it("renders no results message when data fetch fails", async () => {
    vi.mocked(useGetActivitiesByEventQuery).mockImplementationOnce(
      () =>
        ({
          data: undefined,
          error: new Error("Failed to fetch data"),
          isPending: false,
        }) as unknown as UseQueryResult<ActivityDataType, Error>,
    );
    const { getByText } = render(<RecentSignups />);
    await waitFor(() => {
      expect(getByText("No results.")).toBeInTheDocument();
    });
  });
});
