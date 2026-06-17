import {
  formatNumber,
  formatShortDate,
  formatShortTime,
  getTrend,
  normalizeLevel
} from "./dashboardUtils";
import DashboardError from "./DashboardError";

export default function RiverHistoryCard({
  riverLevels,
  historyWindow,
  onHistoryWindowChange,
  error
}) {
  const visibleHistory = riverLevels.slice(0, historyWindow);

  return (
    <section className="history-card">
      <div className="section-heading-row">
        <div>
          <span className="section-kicker">Histórico</span>
          <h2 className="section-title">Variações do nível do rio</h2>
        </div>

        <div className="history-toggle" aria-label="Selecionar período">
          <button
            type="button"
            className={historyWindow === 7 ? "active" : ""}
            onClick={() => onHistoryWindowChange(7)}
          >
            7 dias
          </button>
          <button
            type="button"
            className={historyWindow === 30 ? "active" : ""}
            onClick={() => onHistoryWindowChange(30)}
          >
            30 dias
          </button>
        </div>
      </div>

      {error ? (
        <DashboardError message={error} compact />
      ) : (
        <div className="history-list">
          {visibleHistory.length === 0 ? (
            <span className="empty-text">Sem leituras disponíveis</span>
          ) : (
            visibleHistory.map((item, index) => {
              const previous = visibleHistory[index + 1];
              const level = normalizeLevel(item.nivel);
              const previousLevel = normalizeLevel(previous?.nivel);
              const variation =
                level !== null && previousLevel !== null
                  ? level - previousLevel
                  : null;
              const trend = getTrend(variation);

              return (
                <div className="history-row" key={item.id || index}>
                  <div className="history-date">
                    <span>{formatShortDate(item.data)}</span>
                    <small>{formatShortTime(item.data)}</small>
                  </div>
                  <strong>{level === null ? "--" : `${formatNumber(level)} m`}</strong>
                  <span className={`trend-pill small ${trend.type}`}>
                    {trend.shortLabel}
                  </span>
                  <span className="history-variation">
                    {variation === null
                      ? "--"
                      : `${variation > 0 ? "+" : ""}${formatNumber(variation)} m`}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
}
