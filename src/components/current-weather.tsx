import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { GeocodingResponse, WeatherData } from "@/api/types";
interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}
const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;
  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
