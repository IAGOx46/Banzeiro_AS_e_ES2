import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getWeather } from "../services/weatherService";
import { getRiverLevels } from "../services/riverService";
import TopBar from "../components/TopBar";
import { auth } from "../firebase";
import "../dashboard.css";

export default function Dashboard() {
  const user = auth.currentUser;
  const [weather, setWeather] = useState(null);
  const [riverLevels, setRiverLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadWeather() {
    const w = await getWeather();
    setWeather(w);
  }

  async function loadRiver() {
    const r = await getRiverLevels("Itacoatiara-AM");
    setRiverLevels(r.slice(0, 4));
  }

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      await Promise.all([loadWeather(), loadRiver()]);
      setLoading(false);
    }
    loadAll();
  }, []);

  if (loading || !weather) {
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
        {/* CARD PRINCIPAL DO CLIMA */}
        <section className="dashboard-main-card">
          <div className="dashboard-main-left">
            <div className="dashboard-header-row">
              <span className="dashboard-city">{weather.city}</span>
              <LocationIcon className="dashboard-location-icon" />
            </div>

            <div className="dashboard-temp-block">
              <span className="dashboard-temp">{weather.temp}°</span>
              <span className="dashboard-condition">
                {weather.description}
              </span>
            </div>

            <div className="dashboard-minmax-row">
              <span>Max {weather.max}°</span>
              <span>Min {weather.min}°</span>
            </div>
          </div>

          <div className="dashboard-main-right">
            <RainIcon className="dashboard-main-weather-icon" />
          </div>
        </section>

        {/* LINHA INFERIOR COM 2 CARDS */}
        <section className="dashboard-bottom-row">
          {/* MÉTRICAS DE CLIMA */}
          <div className="dashboard-metrics-card">
            <div className="metrics-row">
              <div className="metrics-left">
                <RainChanceIcon className="metrics-icon" />
                <span className="metrics-label">Probabilidade de Chuva</span>
              </div>
              <span className="metrics-value">{weather.rain}%</span>
            </div>

            <div className="metrics-divider" />

            <div className="metrics-row">
              <div className="metrics-left">
                <HumidityIcon className="metrics-icon" />
                <span className="metrics-label">Umidade</span>
              </div>
              <span className="metrics-value">{weather.humidity}%</span>
            </div>

            <div className="metrics-divider" />

            <div className="metrics-row">
              <div className="metrics-left">
                <WindIcon className="metrics-icon" />
                <span className="metrics-label">Vento</span>
              </div>
              <span className="metrics-value">{weather.wind} Km/h</span>
            </div>
          </div>

          {/* CARD NÍVEL DO RIO */}
          <div className="dashboard-river-card">
            <h3 className="river-title">Atualizações Nível do Rio</h3>

            <div className="river-list">
              {riverLevels.map((item, index) => (
                <div className="river-row" key={index}>
                  <span className="river-date">
                    Dia {item.data.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                  <RiverLevelIcon className="river-icon" />
                  <span className="river-level">
                    {Number(item.nivel).toFixed(2)} m
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}



function LocationIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 21 22"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6-5.2-6-10.2C6 7.3 8.7 4.5 12 4.5s6 2.8 6 6.3C18 15.8 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

function RainIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 14a5 5 0 0 1 4.5-5 5 5 0 0 1 8.5 3 4 4 0 0 1-.5 8H11a4 4 0 0 1-1-7.9z" />
      <line x1="10" y1="22" x2="8" y2="26" />
      <line x1="16" y1="22" x2="14" y2="26" />
      <line x1="22" y1="22" x2="20" y2="26" />
    </svg>
  );
}

function RainChanceIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10a5 5 0 0 1 10 0 4 4 0 0 1-1 7.8H8a4 4 0 0 1-1-7.8z" />
      <line x1="9" y1="19" x2="7.5" y2="21.5" />
      <line x1="13" y1="19" x2="11.5" y2="21.5" />
    </svg>
  );
}

function HumidityIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5s-5 5-5 9.2A5 5 0 0 0 12 18a5 5 0 0 0 5-5.3c0-4.2-5-9.2-5-9.2z" />
      <path d="M10 14a2 2 0 0 0 2 2" />
    </svg>
  );
}

function WindIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9h8a2.5 2.5 0 1 0-2.4-3" />
      <path d="M3 13h13a2.5 2.5 0 1 1-2.4 3" />
      <path d="M5 17h5" />
    </svg>
  );
}

function RiverLevelIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16c1 .6 2 .9 3 .9s2-.3 3-.9 2-.9 3-.9 2 .3 3 .9 2 .9 3 .9" />
      <path d="M4 12c1 .6 2 .9 3 .9s2-.3 3-.9 2-.9 3-.9 2 .3 3 .9 2 .9 3 .9" />
    </svg>
  );
}
