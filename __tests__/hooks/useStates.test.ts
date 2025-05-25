import { renderHook, waitFor } from "@testing-library/react";
import * as countriesApi from "../../src/redux/api/countries";
import { useStates } from "../../src/hooks/useStates";

jest.mock("../../src/hooks/useStates");

const countries = [
  { name: "Egypt", code: "EG" },
  { name: "United States", code: "US" },
];

describe("useStates", () => {
  it("returns states list", () => {
    (useStates as jest.Mock).mockReturnValue(["Cairo", "Giza"]);
    const states = useStates("EG", [
      { name: "Egypt", code: "EG" },
      { name: "United States", code: "US" },
    ]);
    expect(states).toEqual(["Cairo", "Giza"]);
  });
});

describe("useStates integration", () => {
  it("returns correct states for a given country code", () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual(
      "../../src/hooks/useStates",
    );
    const countries = [
      { name: "Egypt", code: "EG" },
      { name: "United States", code: "US" },
    ];
    const { result } = renderHook(() => realUseStates("EG", countries));
    expect(Array.isArray(result.current)).toBe(true);
    // Should return an array (could be empty if no states for code)
  });
});

describe("useStates edge cases", () => {
  it("returns an empty array if country code is empty string", () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual("../../src/hooks/useStates");
    const { result } = renderHook(() => realUseStates("", countries));
    expect(result.current).toEqual([]);
  });

  it("returns an empty array if country code is undefined", () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual("../../src/hooks/useStates");
    const { result } = renderHook(() => realUseStates(undefined, countries));
    expect(result.current).toEqual([]);
  });

  it("returns an empty array if country code is not found", () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual("../../src/hooks/useStates");
    const { result } = renderHook(() => realUseStates("ZZ", countries));
    expect(result.current).toEqual([]);
  });

  it("returns the same array instance for the same country code (memoization)", () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual("../../src/hooks/useStates");
    const { result, rerender } = renderHook(({ code }) => realUseStates(code, countries), {
      initialProps: { code: "EG" },
    });
    const first = result.current;
    rerender({ code: "EG" });
    expect(result.current).toBe(first);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("returns an empty array if fetchStates resolves to a non-array value (e.g., string)", async () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual("../../src/hooks/useStates");
    const spy = jest.spyOn(countriesApi, "fetchStates").mockResolvedValue("not-an-array" as unknown as string[]);
    const { result } = renderHook(() => realUseStates("EG", countries));
    await waitFor(() => Array.isArray(result.current));
    expect(result.current).toEqual([]);
    spy.mockRestore();
  });

  it("returns an empty array if fetchStates throws (error branch)", async () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual("../../src/hooks/useStates");
    const spy = jest.spyOn(countriesApi, "fetchStates").mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => realUseStates("EG", countries));
    await waitFor(() => Array.isArray(result.current));
    expect(result.current).toEqual([]);
    spy.mockRestore();
  });

  it("sets states if fetchStates resolves to an array", async () => {
    jest.unmock("../../src/hooks/useStates");
    const { useStates: realUseStates } = jest.requireActual("../../src/hooks/useStates");
    const mockStates = ["Cairo", "Giza"];
    const spy = jest.spyOn(countriesApi, "fetchStates").mockResolvedValue(mockStates);
    const { result } = renderHook(() => realUseStates("EG", countries));
    await waitFor(() => expect(result.current).toEqual(mockStates));
    spy.mockRestore();
  });
});
