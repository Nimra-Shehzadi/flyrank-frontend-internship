import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Testing Dashboard", () => {
  it("renders the dashboard heading", () => {
    render(<App />);

    expect(screen.getByText("Testing Dashboard")).toBeInTheDocument();
  });

  it("shows the initial ready message", () => {
    render(<App />);

    expect(
      screen.getByText("Testing dashboard is ready.")
    ).toBeInTheDocument();

    expect(screen.getByText("READY")).toBeInTheDocument();
  });

  it("renders both test action buttons", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Run successful test" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Run failing test" })
    ).toBeInTheDocument();
  });

  it("shows success state after running passing test", () => {
    render(<App />);

    const button = screen.getByRole("button", {
      name: "Run successful test",
    });

    fireEvent.click(button);

    expect(
      screen.getByText("All tests passed successfully!")
    ).toBeInTheDocument();

    expect(screen.getByText("PASSED")).toBeInTheDocument();
    expect(screen.getByText("Test Passed")).toBeInTheDocument();
  });

  it("shows error state after simulating failure", () => {
    render(<App />);

    const button = screen.getByRole("button", {
      name: "Run failing test",
    });

    fireEvent.click(button);

    expect(
      screen.getByText("Test failed. Please review the reported issue.")
    ).toBeInTheDocument();

    expect(screen.getByText("FAILED")).toBeInTheDocument();
    expect(screen.getByText("Test Failed")).toBeInTheDocument();
  });

  it("recovers from failure to success state", () => {
    render(<App />);

    const failureButton = screen.getByRole("button", {
      name: "Run failing test",
    });

    const successButton = screen.getByRole("button", {
      name: "Run successful test",
    });

    fireEvent.click(failureButton);

    expect(screen.getByText("FAILED")).toBeInTheDocument();

    fireEvent.click(successButton);

    expect(screen.getByText("PASSED")).toBeInTheDocument();
    expect(
      screen.getByText("All tests passed successfully!")
    ).toBeInTheDocument();
  });

  it("provides an accessible live status message", () => {
    render(<App />);

    const status = screen.getByRole("status");

    expect(status).toHaveAttribute("aria-live", "polite");
  });
});