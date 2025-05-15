import type { ForecastData } from "@/api/types"

interface HourlyTemperatureProps {
    data : ForecastData  ;

}

const HourlyTemperature = ({data} : HourlyTemperatureProps) => {
  return (
    <div>
       hourly temperature 
    </div>
  )
}

export default HourlyTemperature
