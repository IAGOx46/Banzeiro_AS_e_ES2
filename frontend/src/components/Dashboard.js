import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getHourlyForecast, getWeather } from "../services/weatherService";
import { getRiverLevels } from "../services/riverService";
import TopBar from "../components/TopBar";
import { auth } from "../firebase";
import RiverSummaryCard from "./dashboard/RiverSummaryCard";
import WeatherCard from "./dashboard/WeatherCard";
import HourlyForecastCard from "./dashboard/HourlyForecastCard";
import RiverHistoryCard from "./dashboard/RiverHistoryCard";
import "../dashboard.css";

const CITY = "Itacoatiara-AM";
const LOAD_ERROR_MESSAGE = "Tente atualizar a página ou verificar sua conexão.";

export default function Dashboard() {
  const user = auth.currentUser;
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [riverLevels, setRiverLevels] = useState([]);
  const [historyWindow, setHistoryWindow] = useState(7);
  const [errors, setErrors] = useState({ weather: "", forecast: "", river: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);

      const [weatherResult, forecastResult, riverResult] = await Promise.allSettled([
        getWeather(),
        getHourlyForecast(),
        getRiverLevels(CITY, 30)
      ]);

      setWeather(weatherResult.status === "fulfilled" ? weatherResult.value : null);
      setHourlyForecast(
        forecastResult.status === "fulfilled" && Array.isArray(forecastResult.value)
          ? forecastResult.value
          : []
      );
      setRiverLevels(
        riverResult.status === "fulfilled" && Array.isArray(riverResult.value)
          ? riverResult.value
          : []
      );

      setErrors({
        weather: weatherResult.status === "rejected" ? LOAD_ERROR_MESSAGE : "",
        forecast: forecastResult.status === "rejected" ? LOAD_ERROR_MESSAGE : "",
        river: riverResult.status === "rejected" ? LOAD_ERROR_MESSAGE : ""
      });
      setLoading(false);
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="loadingScreen">
        <Spinner animation="border" />
        <p className="mt-3">Carregando dados do Banzeiro...</p>
      </div>
    );
  }

  return (
    <div className="dash-page">
      <TopBar user={user} />

      <main className="dashboard-container">
        <RiverSummaryCard
          city={CITY}
          riverLevels={riverLevels}
          historyWindow={historyWindow}
          error={errors.river}
        />

        <section className="dashboard-grid">
          <WeatherCard weather={weather} error={errors.weather} />
          <HourlyForecastCard
            forecast={hourlyForecast}
            error={errors.forecast}
          />
        </section>

        <RiverHistoryCard
          riverLevels={riverLevels}
          historyWindow={historyWindow}
          onHistoryWindowChange={setHistoryWindow}
          error={errors.river}
        />
      </main>
    </div>
  );
}
