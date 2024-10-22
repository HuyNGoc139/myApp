import axios from "axios"

const API_KEY ='68733361387a4cdd9b870705242110'
const forecastEndpoint=params=>`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.city}&days=${params.day}&aqi=no&alerts=no`
const locationEndpoint=params=>`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`
export const fetchCurrentLocation = (params) => {
    const endpoint = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.latitude},${params.longitude}&days=${params.day}`;
    return apiCall(endpoint);
};
const apiCall=async(endpoint)=>{
    const options={
        method:'GET',
        url:endpoint
    }
    try {
        const response=axios.request(options);
        return (await response).data
    } catch (error) {
        console.log('err:',error)
        return null
    }
}
export const fetchWeatherForeCast=params=>{
    return apiCall(forecastEndpoint(params))
}
export const fetchLocation=params=>{
    return apiCall(locationEndpoint(params))
}