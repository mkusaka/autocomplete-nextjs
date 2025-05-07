import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "../src/app/page";

global.fetch = vi.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ completion: "Next.js example" }),
  })
}) as unknown as typeof fetch;

describe("Autocomplete Page", () => {
  it("displays suggestions as user types", async () => {
    render(<Page />);

    const input = screen.getByPlaceholderText("Start typing...");
    fireEvent.change(input, { target: { value: "Next.js" } });

    await waitFor(() => {
      expect(screen.getByText("Next.js example")).toBeInTheDocument();
    });
  });
})
