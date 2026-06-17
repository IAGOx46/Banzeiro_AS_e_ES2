export function normalizeLevel(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

export function getTrend(variation) {
  if (variation === null || Math.abs(variation) < 0.01) {
    return {
      type: "stable",
      label: "Estável",
      shortLabel: "Estável"
    };
  }

  if (variation > 0) {
    return {
      type: "up",
      label: "Subindo",
      shortLabel: "Subiu"
    };
  }

  return {
    type: "down",
    label: "Descendo",
    shortLabel: "Desceu"
  };
}

export function formatNumber(value) {
  return Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function getDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDateTime(value) {
  const date = getDate(value);
  if (!date) return "";

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatShortDate(value) {
  const date = getDate(value);
  if (!date) return "--/--";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit"
  });
}

export function formatShortTime(value) {
  const date = getDate(value);
  if (!date) return "--:--";

  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
