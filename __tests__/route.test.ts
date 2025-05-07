import { describe, expect, it, vi } from "vitest";
import { POST } from "../src/app/api/route";
import { NextRequest } from "next/server";

vi.mock("../src/lib/autocomplete", () => {
  return {
    generateAutocomplete: vi.fn(() =>
      Promise.resolve("mocked autocomplete response"),
    ),
  };
});

function mockRequest(body: { prompt?: string }): NextRequest {
  return { json: async () => body } as NextRequest;
}

describe("POST /api", () => {
  it("returns a suggestion for valid prompt", async () => {
    const request = mockRequest({ prompt: "Next.js" });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);

    expect(data).toEqual({
      completion: "mocked autocomplete response",
    });
  });

  it("returns a 400 error for invalid request", async () => {
    const req = mockRequest({});

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ completion: "Missing prompt" });
  });
});
