import React, { useEffect, useState } from 'react'
import weather from '../services/weather';

export const WeatherDetail = ({ city }) => {
  const [cityData, setCitydata] = useState(null)
  const { getWeather,getWeatherIcon } = weather
  console.log('weatherDetail');

  useEffect(() => {
    getWeather(city)
      .then(resp => {
        setCitydata(resp)
        console.log('weather details:', resp)
      })

  }, [city]);
  
  const kelvinToCelcius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2)
  } 
  if (!cityData) { return <p>Loading...</p>}
  const tempCelcius = kelvinToCelcius(cityData.list[0].main.temp)
  return (
    <section style={{display:'flex', flexDirection:'column'}}>
      <h2><strong>
        Weather in {city}
      </strong></h2>
      <p>temperature {tempCelcius} Celcius</p>
      <div><img src={getWeatherIcon(cityData.list[0].weather[0].icon)} alt="weather icon" /></div>
      <p>wind {cityData.list[0].wind.speed} m/s</p>
    </section>
  )
}
