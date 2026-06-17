import RiverChart from "../RiverChart";
import DashboardError from "./DashboardError";
import {
  formatDateTime,
  formatNumber,
  getTrend,
  normalizeLevel
} from "./dashboardUtils";

export default function RiverSummaryCard({
  city,
  riverLevels,
  historyWindow,
  error
}) {
  const current = riverLevels[0] || null;
  const previous = riverLevels[1] || null;
  const currentLevel = normalizeLevel(current?.nivel);
  const previousLevel = normalizeLevel(previous?.nivel);
  const variation =
    currentLevel !== null && previousLevel !== null
      ? currentLevel - previousLevel
      : null;
  const trend = getTrend(variation);

  return (
    <section className="river-hero-card">
      <div className="river-hero-copy">
        <div className="dashboard-header-row">
          <span className="dashboard-city">Rio Amazonas - {city}</span>
          <RiverLevelIcon className="river-hero-icon" />
        </div>

        {error ? (
          <DashboardError message={error} compact />
        ) : (
          <>
            <div className="river-current-block">
              <span className="river-current-label">Nível atual</span>
              <strong className="river-current-value">
                {currentLevel === null ? "--" : `${formatNumber(currentLevel)} m`}
              </strong>
            </div>

            <div className="river-status-row">
              <span className={`trend-pill ${trend.type}`}>{trend.label}</span>
              <span className="river-variation">
                {variation === null
                  ? "Variação indisponível"
                  : `${variation > 0 ? "+" : ""}${formatNumber(
                      variation
                    )} m desde a última medição`}
              </span>
            </div>

            <p className="river-updated">
              Última atualização: {formatDateTime(current?.data) || "sem registro"}
            </p>
          </>
        )}
      </div>

      <div className="river-hero-chart">
        {error ? (
          <div className="chart-empty-state">Gráfico indisponível</div>
        ) : (
          <RiverChart station={city} points={historyWindow} />
        )}
      </div>
    </section>
  );
}

function RiverLevelIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16c1 .6 2 .9 3 .9s2-.3 3-.9 2-.9 3-.9 2 .3 3 .9 2 .9 3 .9" />
      <path d="M4 12c1 .6 2 .9 3 .9s2-.3 3-.9 2-.9 3-.9 2 .3 3 .9 2 .9 3 .9" />
    </svg>
  );
}
