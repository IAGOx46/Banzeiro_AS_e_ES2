// src/services/weatherService.js

export async function getWeather() {
  const apiKey = "83827ec885406a3b4a68f146a5235417";
  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=-3.14&lon=-58.45&appid=${apiKey}&units=metric&lang=pt_br`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    rain: data.rain ? data.rain["1h"] || 0 : 0,
    wind: Math.round((data.wind?.speed || 0) * 3.6),
    max: Math.round(data.main.temp_max),
    min: Math.round(data.main.temp_min),
    description: data.weather[0].description,
    icon: data.weather[0].icon
  };
}

export async function getHourlyForecast() {
  const apiKey = "83827ec885406a3b4a68f146a5235417";
  const url =
    `https://api.openweathermap.org/data/2.5/forecast?lat=-3.14&lon=-58.45&appid=${apiKey}&units=metric&lang=pt_br`;

  const response = await fetch(url);
  const data = await response.json();

  return (data.list || []).slice(0, 8).map((item) => {
    const date = new Date((item.dt || 0) * 1000);

    return {
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      temp: Math.round(item.main?.temp || 0),
      rainProbability: Math.round((item.pop || 0) * 100),
      wind: Math.round((item.wind?.speed || 0) * 3.6),
      description: item.weather?.[0]?.description || "",
      icon: item.weather?.[0]?.icon || ""
    };
  });
}
