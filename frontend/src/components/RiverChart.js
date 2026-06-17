import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import { getRiverLevels } from "../services/riverService";

const RISK_THRESHOLD = 7.5;

export default function RiverChart({ station = "Itacoatiara-AM", points = 9 }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    chartRef.current = Highcharts.chart(containerRef.current, {
      chart: {
        type: "areaspline",
        backgroundColor: "transparent",
        plotBackgroundColor: "transparent",
        plotBorderWidth: 0,
        spacing: [14, 8, 8, 8],
      },

      title: {
        text: "Historico do nivel",
        align: "left",
        style: { color: "#ffffff", fontWeight: 800, fontSize: "15px" },
      },

      subtitle: {
        text: station,
        align: "left",
        style: { color: "rgba(255,255,255,0.62)", fontSize: "12px" },
      },

      xAxis: {
        categories: [],
        tickLength: 0,
        lineColor: "rgba(255,255,255,0.16)",
        gridLineColor: "rgba(255,255,255,0.05)",
        gridLineWidth: 1,
        labels: {
          style: { color: "rgba(255,255,255,0.78)", fontWeight: 700 },
        },
      },

      yAxis: {
        title: { text: null },
        labels: {
          format: "{value} m",
          style: { color: "rgba(255,255,255,0.72)" },
        },
        gridLineColor: "rgba(255,255,255,0.08)",
        gridLineWidth: 1,
        lineColor: "transparent",
        min: 0,
        max: 10,
        tickInterval: 1,
      },

      series: [
        {
          name: "Nivel do rio",
          data: [],
          color: "#78e3d0",
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, "rgba(120, 227, 208, 0.46)"],
              [1, "rgba(120, 227, 208, 0.04)"],
            ],
          },
          marker: {
            enabled: true,
            radius: 4,
            fillColor: "#0b3447",
            lineColor: "#78e3d0",
            lineWidth: 2,
          },
          lineWidth: 4,
          states: {
            hover: { lineWidth: 4 },
          },
        },
      ],

      tooltip: {
        useHTML: true,
        backgroundColor: "rgba(5, 24, 35, 0.94)",
        borderColor: "rgba(120, 227, 208, 0.45)",
        borderRadius: 10,
        borderWidth: 1,
        shadow: false,
        style: { color: "#ffffff" },
        formatter: function () {
          const value = typeof this.y === "number" ? this.y.toFixed(2) : "--";
          return `
            <div class="river-chart-tooltip">
              <strong>${value} m</strong>
              <span>${this.x}</span>
            </div>
          `;
        },
      },

      credits: { enabled: false },
      legend: { enabled: false },

      plotOptions: {
        series: {
          connectNulls: true,
          animation: { duration: 650 },
        },
        areaspline: {
          softThreshold: false,
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [station]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const rows = await getRiverLevels(station, points);
        if (!mounted || !chartRef.current) return;

        if (!Array.isArray(rows) || rows.length === 0) {
          chartRef.current.xAxis[0].setCategories([], false);
          chartRef.current.series[0].setData([], false);
          chartRef.current.yAxis[0].update({ min: 0, max: 10, tickInterval: 1 }, false);
          chartRef.current.yAxis[0].removePlotLine("riskLine");
          chartRef.current.yAxis[0].removePlotLine("currentLevelLine");
          chartRef.current.redraw();
          return;
        }

        const slice = rows.slice(0, points).reverse();
        const categories = slice.map((item) => formatChartDate(item.data));
        const values = slice.map((item) =>
          item.nivel === null || item.nivel === undefined ? null : Number(item.nivel)
        );
        const numeric = values.filter((value) => value !== null && !Number.isNaN(value));

        let min = 0;
        let max = 10;
        let tickInterval = 1;

        if (numeric.length) {
          const minValue = Math.min(...numeric);
          const maxValue = Math.max(...numeric);
          const range = Math.max(0.5, maxValue - minValue);
          tickInterval = range <= 2 ? 0.5 : Math.max(1, Math.round(range / 5));
          min = Math.max(0, Math.floor((minValue - tickInterval) * 2) / 2);
          max = Math.ceil((maxValue + tickInterval) * 2) / 2;
        }

        const first = numeric[0];
        const last = numeric[numeric.length - 1];
        const isRising = first !== undefined && last !== undefined && last > first;
        const lineColor = isRising ? "#ffd166" : "#78e3d0";
        const fillStart = isRising
          ? "rgba(255, 209, 102, 0.46)"
          : "rgba(120, 227, 208, 0.46)";

        const seriesData = values.map((value, index) => {
          if (value === null || Number.isNaN(value)) return null;

          const isLastPoint = index === values.length - 1;
          return {
            y: value,
            marker: isLastPoint
              ? {
                  enabled: true,
                  radius: 7,
                  fillColor: "#ffffff",
                  lineColor,
                  lineWidth: 3,
                }
              : undefined,
            dataLabels: isLastPoint
              ? {
                  enabled: true,
                  format: "{y:.2f} m",
                  align: "right",
                  y: -14,
                  style: {
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 800,
                    textOutline: "0px",
                  },
                }
              : undefined,
          };
        });

        chartRef.current.xAxis[0].setCategories(categories, false);
        chartRef.current.series[0].update(
          {
            color: lineColor,
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, fillStart],
                [1, "rgba(120, 227, 208, 0.04)"],
              ],
            },
            marker: {
              enabled: true,
              radius: 4,
              fillColor: "#0b3447",
              lineColor,
              lineWidth: 2,
            },
            data: seriesData,
          },
          false
        );
        chartRef.current.yAxis[0].update({ min, max, tickInterval }, false);

        chartRef.current.yAxis[0].removePlotLine("riskLine");
        chartRef.current.yAxis[0].removePlotLine("currentLevelLine");

        if (max >= RISK_THRESHOLD) {
          chartRef.current.yAxis[0].addPlotLine({
            id: "riskLine",
            value: RISK_THRESHOLD,
            color: "#ffb347",
            width: 2,
            dashStyle: "Dash",
            zIndex: 6,
            label: {
              text: "Atenção",
              align: "right",
              x: -6,
              y: -8,
              style: { color: "#ffd08a", fontSize: "11px", fontWeight: 800 },
            },
          });
        }

        if (typeof last === "number") {
          chartRef.current.yAxis[0].addPlotLine({
            id: "currentLevelLine",
            value: last,
            color: "rgba(255,255,255,0.42)",
            width: 1,
            dashStyle: "ShortDash",
            zIndex: 4,
          });
        }

        chartRef.current.redraw();
      } catch (err) {
        console.error("Erro carregando niveis do rio:", err);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [station, points]);

  return (
    <div className="river-chart-wrapper">
      <div ref={containerRef} />
    </div>
  );
}

function formatChartDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}
