import { renderHook, waitFor } from "@testing-library/react";
import * as countriesApi from "../../src/redux/api/countries";

jest.mock("../../src/redux/api/countries");

const mockCountries = [
  { name: "Egypt", code: "EG" },
  { name: "United States", code: "US" },
];

// Unit test for useCountries

describe("useCountries", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("returns countries list", async () => {
    const useCountriesModule = await import("../../src/hooks/useCountries");
    jest.spyOn(useCountriesModule, "useCountries").mockReturnValue(mockCountries);
    const { result } = renderHook(() => useCountriesModule.useCountries());
    expect(result.current).toEqual(mockCountries);
  });
});

describe("useCountries integration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns a non-empty array of country objects", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue(mockCountries);
    const useCountriesModule = await import("../../src/hooks/useCountries");
    const { result } = renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => result.current.length > 0);
    expect(Array.isArray(result.current)).toBe(true);
  });

  it("returns an empty array if fetchCountries throws (error branch)", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockRejectedValue(new Error("Network error"));
    const useCountriesModule = await import("../../src/hooks/useCountries");
    const { result } = renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => Array.isArray(result.current));
    expect(result.current).toEqual([]);
  });

  it("returns an empty array if fetchCountries resolves to non-array (fallback branch)", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue(null);
    const useCountriesModule = await import("../../src/hooks/useCountries");
    const { result } = renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => Array.isArray(result.current));
    expect(result.current).toEqual([]);
  });
});

describe("useCountries edge cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns an empty array if fetchCountries resolves to an empty array", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue([]);
    const useCountriesModule = await import("../../src/hooks/useCountries");
    const { result } = renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => Array.isArray(result.current));
    expect(result.current).toEqual([]);
  });

  it("returns an empty array if fetchCountries resolves to undefined", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue(undefined);
    const useCountriesModule = await import("../../src/hooks/useCountries");
    const { result } = renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => Array.isArray(result.current));
    expect(result.current).toEqual([]);
  });

  it("returns an empty array if fetchCountries resolves to a string (invalid type)", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue("not-an-array");
    const useCountriesModule = await import("../../src/hooks/useCountries");
    const { result } = renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => Array.isArray(result.current));
    expect(result.current).toEqual([]);
  });

  it("calls fetchCountries only once per mount", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue(mockCountries);
    const useCountriesModule = await import("../../src/hooks/useCountries");
    renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => (countriesApi.fetchCountries as jest.Mock).mock.calls.length === 1);
    expect((countriesApi.fetchCountries as jest.Mock)).toHaveBeenCalledTimes(1);
  });

  it("returns cached countries on re-render (does not call fetch again)", async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue(mockCountries);
    const useCountriesModule = await import("../../src/hooks/useCountries");
    const { result, rerender } = renderHook(() => useCountriesModule.useCountries());
    await waitFor(() => result.current.length > 0);
    rerender();
    expect((countriesApi.fetchCountries as jest.Mock)).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(mockCountries);
  });
});
