import weatherApi from "../api/weather.mjs"
import { useState, useEffect } from 'react'


const weather = (city) => {

  console.log(`City passed ${city}`)
  
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    // create a function to call the weather api
    const getWeather = async () => {
      try {
        const weather = await weatherApi({ city })
        setWeatherData(weather)
      } catch (err) {
        console.error(err)
        res.status(500).json({ msg: `API fetch error` })
      }

    }

    getWeather()

  }, [city])

  return { weatherData }

}

export default weather