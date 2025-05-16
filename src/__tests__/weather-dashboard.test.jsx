import { render, screen } from "@testing-library/react";
import WeatherDashboard from "@/pages/weather-dashboard.tsx";
import { vi } from "vitest";
import * as geoHook from "@/hooks/use-geolocation";
import * as weatherHook from "@/hooks/use-weather";

vi.mock("@/components/current-weather", () => ({
  default: () => <div>Mock CurrentWeather</div>
}));
vi.mock("@/components/hourly-temperature", () => ({
  default: () => <div>Mock HourlyTemperature</div>
}));
vi.mock("@/components/weather-details", () => ({
  default: () => <div>Mock WeatherDetails</div>
}));
vi.mock("@/components/weather-forecast", () => ({
  default: () => <div>Mock WeatherForecast</div>
}));
vi.mock("@/components/loading-skeleton", () => ({
  default: () => <div>Loading...</div>
}));

describe("WeatherDashboard", () => {
  const baseGeoMock = {
    coordinates: { lat: 12, lon: 77 },
    error: null,
    getLocation: vi.fn(),
    isLoading: false
  };
 


  const baseWeatherMock = {
    data: { temp: 20 },
    error: null,
    isFetching: false,
    refetch: vi.fn()
  };

  const baseForecastMock = {
    data: { forecast: [] },
    error: null,
    isFetching: false,
    refetch: vi.fn()
  };

  const baseLocationMock = {
    data: ["Bangalore"],
    error: null,
    isFetching: false,
    refetch: vi.fn()
  };

  beforeEach(() => {
    vi.spyOn(geoHook, "useGeolocation").mockReturnValue(baseGeoMock);
    vi.spyOn(weatherHook, "useWeatherQuery").mockReturnValue(baseWeatherMock);
    vi.spyOn(weatherHook, "useForecastQuery").mockReturnValue(baseForecastMock);
    vi.spyOn(weatherHook, "useReverseGeocodeQuery").mockReturnValue(baseLocationMock);
  });

  it("renders all main components", () => {
    render(<WeatherDashboard />);
    expect(screen.getByText("My Location")).toBeDefined();
    expect(screen.getByText("Mock CurrentWeather")).toBeDefined();
    expect(screen.getByText("Mock HourlyTemperature")).toBeDefined();
    expect(screen.getByText("Mock WeatherDetails")).toBeDefined();
    expect(screen.getByText("Mock WeatherForecast")).toBeDefined();
  });

  it("shows loading state when geolocation is loading", () => {
    vi.spyOn(geoHook, "useGeolocation").mockReturnValue({
      ...baseGeoMock,
      isLoading: true
    });
    render(<WeatherDashboard />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("shows error when geolocation error exists", () => {
    vi.spyOn(geoHook, "useGeolocation").mockReturnValue({
      ...baseGeoMock,
      error: "Location not available"
    });
    render(<WeatherDashboard />);
    expect(screen.getByText("Location Error")).toBeDefined();
    expect(screen.getByText("Location not available")).toBeDefined();
  });
});


