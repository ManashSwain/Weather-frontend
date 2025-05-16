import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

const cityPage = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
 

  const coordinates = {lat , lon};

  // eslint-disable-next-line react-hooks/rules-of-hooks
      const weatherQuery = useWeatherQuery(coordinates);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const forecastQuery = useForecastQuery(coordinates);

       if(weatherQuery.error||forecastQuery.error){
          return <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>Failed to fetch weather data. Please try again</p>
        </AlertDescription>
       </Alert>
    }

      if(!weatherQuery.data || !forecastQuery.data || !params.cityName){
        return <WeatherSkeleton/>
    }

  return (
    <div>
      <div className="space-y-4">
     {/* Favourite cities  */}
     <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
       
     </div>
     {/* current and hourly weather  */}
  <div className="grid gap-6">

    <div className="flex flex-col lg:flex-row gap-4" >
        {/* current weather  */}
        <CurrentWeather data={weatherQuery.data}/>
        {/* hourly temperature  */}
        <HourlyTemperature data={forecastQuery.data}/>

    </div>
    <div className="grid gap-6 md:grid-cols-2 items-start">
        {/* details  */}
        <WeatherDetails data={weatherQuery.data}/>
        {/* forecast  */}
        <WeatherForecast data={forecastQuery.data}/>
    </div>
  </div>
    </div>
      
    </div>
  )
}

export default cityPage
