import axios from "axios"

const apiKey = import.meta.env.VITE_WEATHER_KEY

const weatherApi = async ({ city }) => {
const url = "http://api.weatherapi.com/v1/current.json"


    try {

        const weather = await axios.post(`${url}?key=${apiKey}&q=${city}&aqi=no`)
        console.log(weather.data.current.condition.text) // debugging
        return weather.data.current.condition.text

    } catch (err) {
        console.error(`Error from Weather API: ${JSON.stringify(err.response ? err.response.data : err.message)}`)
        throw err
    }
}


export default weatherApi