import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

const weatherDashboard = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {coordinates , error:locationError ,getLocation,isLoading:locationLoading } = useGeolocation();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);
    // console.log(weatherQuery);
    // console.log(forecastQuery);
    // console.log(locationQuery);

    const handleRefresh = ()=>{
        getLocation();
        if(coordinates){
           weatherQuery.refetch();
           forecastQuery.refetch();
           locationQuery.refetch();
        }
    };
    if(locationLoading){
       return <WeatherSkeleton/>
    }

    if(locationError){
       return <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
                <MapPin className="mr-2 h-4 w-4"/>
                Enable Location
            </Button>
        </AlertDescription>
       </Alert>
    }

    if(!coordinates){
       return <Alert variant={"destructive"}>
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>Please enable location access to see your local weather.</p>
            <Button onClick={getLocation} variant={"outline"} className="w-fit">
                <MapPin className="mr-2 h-4 w-4"/>
                Enable Location
            </Button>
        </AlertDescription>
       </Alert>
    }
  return (
    <div className="space-y-4">
     {/* Favourite cities  */}
     <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button  variant = {'outline'} size={"icon"}
         onClick={handleRefresh}
        // disabled={}
         >
            <RefreshCw className="h-4 w-4"/>
        </Button>
     </div>
     {/* current and hourly weather  */}

    </div>
  )
}

export default weatherDashboard
