import DashboardError from "./DashboardError";
import MetricItem from "./MetricItem";

export default function WeatherCard({ weather, error }) {
  return (
    <div className="weather-card">
      <div className="weather-main-row">
        <div>
          <span className="section-kicker">Clima agora</span>
          <h2 className="weather-city">{weather?.city || "Itacoatiara"}</h2>
          <span className="dashboard-condition">
            {weather?.description || "Dados indisponíveis"}
          </span>
        </div>
        <div className="weather-temp-box">
          <RainIcon className="dashboard-main-weather-icon" />
          <strong>{weather ? `${weather.temp}°` : "--"}</strong>
        </div>
      </div>

      {error ? (
        <DashboardError message={error} compact />
      ) : (
        <div className="weather-metrics-grid">
          <MetricItem label="Chuva" value={`${weather.rain} mm`} />
          <MetricItem label="Umidade" value={`${weather.humidity}%`} />
          <MetricItem label="Vento" value={`${weather.wind} km/h`} />
          <MetricItem label="Máx / Mín" value={`${weather.max}° / ${weather.min}°`} />
        </div>
      )}
    </div>
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
