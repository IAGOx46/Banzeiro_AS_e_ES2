export default function DashboardError({ message, compact = false }) {
  return (
    <div className={compact ? "card-error compact" : "dashboard-alert"} role="alert">
      <strong>Não foi possível carregar estes dados.</strong>
      <span>{message}</span>
    </div>
  );
}
