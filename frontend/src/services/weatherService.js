// src/services/weatherService.js

export async function getWeather() {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=-3.14&lon=-58.45&appid=83827ec885406a3b4a68f146a5235417&units=metric&lang=pt_br";

  const response = await fetch(url);
  const data = await response.json();

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    rain: data.rain ? data.rain["1h"] || 0 : 0,
    wind: data.wind.speed * 3.6,
    max: Math.round(data.main.temp_max+5),
    min: Math.round(data.main.temp_min-2),
    description: data.weather[0].description,
    icon: data.weather[0].icon
  };
}
