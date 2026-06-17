import DashboardError from "./DashboardError";

export default function HourlyForecastCard({ forecast, error }) {
  return (
    <div className="forecast-card">
      <div className="section-heading-row">
        <div>
          <span className="section-kicker">Próximas 24h</span>
          <h2 className="section-title">Previsão por horário</h2>
        </div>
      </div>

      {error ? (
        <DashboardError message={error} compact />
      ) : (
        <div className="hourly-list">
          {forecast.length === 0 ? (
            <span className="empty-text">Previsão indisponível</span>
          ) : (
            forecast.map((item) => (
              <div className="hourly-item" key={`${item.time}-${item.temp}`}>
                <span className="hourly-time">{item.time}</span>
                <strong className="hourly-temp">{item.temp}°</strong>
                <span className="hourly-description">{item.description}</span>
                <span className="hourly-meta">
                  {item.rainProbability}% chuva · {item.wind} km/h
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
