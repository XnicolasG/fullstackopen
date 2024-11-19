import axios from "axios"


const getWeather = (city) => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
    return request.then(resp => resp.data)
}
const getWeatherIcon = (icon) => {
    try {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`
        
    } catch (error) {
        console.log('getWeatherIcon', error);
        
    }
}
export default {
    getWeather,
    getWeatherIcon
}