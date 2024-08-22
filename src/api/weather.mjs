import axios from "axios"

const apiKey = import.meta.env.VITE_WEATHER_KEY

const weatherApi = async ({ city }) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;


    try {

        const weather = await axios.get(url)
        console.log(weather.data.current.condition.text) // debugging
        return weather.data.current.condition.text

    } catch (err) {
        console.error(`Error from Weather API: ${JSON.stringify(err.response ? err.response.data : err.message)}`)
        return "Weather data not available for this Journal Entry"
    }
}


export default weatherApi
