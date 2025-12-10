import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import { getRiverLevels } from "../services/riverService";

export default function RiverChart({ station = "Itacoatiara-AM", points = 9 }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  // Cria o chart vazio no mount
  useEffect(() => {
    chartRef.current = Highcharts.chart(containerRef.current, {
      chart: {
        type: "spline",
        backgroundColor: "transparent",
        plotBackgroundColor: "transparent",
        plotBorderWidth: 0,
        spacing: [8, 8, 8, 8],
        // não forçamos height aqui, deixamos o CSS controlar (.highcharts-container)
      },

      title: {
        text: station.replace("-", " "),
        align: "center",
        style: { color: "#ffffff", fontWeight: 700, fontSize: "14px" },
      },

      xAxis: {
        categories: [],
        tickLength: 0,
        lineColor: "transparent",
        gridLineColor: "rgba(255,255,255,0.06)",
        gridLineWidth: 1,
        labels: { style: { color: "rgba(255,255,255,0.95)", fontWeight: 600 } },
      },

      yAxis: {
        title: { text: "Nível (m)", style: { color: "rgba(255,255,255,0.95)" } },
        labels: { style: { color: "rgba(255,255,255,0.95)" } },
        gridLineColor: "rgba(255,255,255,0.06)",
        gridLineWidth: 1,
        lineColor: "transparent",
        min: 0,
        max: 10,
        tickInterval: 1,
      },

      series: [
        {
          name: "Nível do rio",
          data: [],
          color: "#ff9f1c",
          marker: {
            enabled: true,
            radius: 4,
            fillColor: "#ff9f1c",
            lineColor: "#ff9f1c",
          },
          lineWidth: 3,
        },
      ],

      tooltip: {
        valueSuffix: " m",
        backgroundColor: "rgba(0,0,0,0.65)",
        style: { color: "#ffffff" },
        borderWidth: 0,
        shadow: true,
      },

      credits: { enabled: false },
      legend: { enabled: false },

      plotOptions: {
        series: {
          connectNulls: true, // une pontos ausentes para visual mais limpo
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  // Carrega os dados do getRiverLevels e atualiza o chart
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const rows = await getRiverLevels(station); // espera [{ data, nivel }, ...]
        if (!mounted || !chartRef.current) return;

        if (!Array.isArray(rows) || rows.length === 0) {
          // limpa o gráfico se não houver dados
          chartRef.current.xAxis[0].setCategories([], false);
          chartRef.current.series[0].setData([], true);
          chartRef.current.yAxis[0].update({ min: 0, max: 10, tickInterval: 1 }, true);
          chartRef.current.yAxis[0].removePlotBand("riskBand");
          return;
        }

        // Pega os últimos 'points' registros e coloca do mais antigo para o mais novo
        const slice = rows.slice(0, points).reverse();

        // Categorias: dia (02, 03...)
        const categories = slice.map((item) => {
          const d = item.data instanceof Date ? item.data : new Date(item.data);
          return isNaN(d.getTime()) ? "" : String(d.getDate()).padStart(2, "0");
        });

        // Series: nivel (null se não tiver)
        const seriesData = slice.map((item) =>
          item.nivel === null || item.nivel === undefined ? null : Number(item.nivel)
        );

        // Calcula min/max do eixo Y com folga apropriada
        const numeric = seriesData.filter((v) => v !== null && !Number.isNaN(v));
        let min = 0,
          max = 10,
          tickInterval = 1;
        if (numeric.length) {
          const mn = Math.min(...numeric);
          const mx = Math.max(...numeric);

          // define intervalo com ~6 divisões
          const rawRange = mx - mn || Math.max(1, Math.round(mx / 6));
          const approxTick = Math.max(1, Math.round(rawRange / 6));
          tickInterval = approxTick;

          min = Math.max(0, Math.floor(mn - tickInterval));
          max = Math.ceil(mx + tickInterval);
        }

        // Atualiza categorias e dados
        chartRef.current.xAxis[0].setCategories(categories, false);
        chartRef.current.series[0].setData(seriesData, false);
        chartRef.current.yAxis[0].update({ min, max, tickInterval }, true);

        // Ajusta o plotBand de "risco" (aparece somente para escalas mais altas)
        chartRef.current.yAxis[0].removePlotBand("riskBand");
        // exemplo: se max for significativo (maior que 10) ou se o valor máximo ultrapassar um limiar fixo
        const RISK_THRESHOLD = 7.5;
        if (max >= RISK_THRESHOLD) {
          const from = Math.max(RISK_THRESHOLD, Math.floor(max * 0.85));
          chartRef.current.yAxis[0].addPlotBand({
            id: "riskBand",
            from,
            to: max,
            color: "rgba(255,50,50,0.08)",
            label: {
              text: "Área de risco",
              align: "right",
              style: { color: "#ff4d4d", fontSize: "11px" },
            },
          });
        } else {
          chartRef.current.yAxis[0].removePlotBand("riskBand");
        }
      } catch (err) {
        console.error("Erro carregando níveis do rio:", err);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [station, points]);

  return (
    <div className="river-chart-wrapper" style={{ padding: "8px 0" }}>
      <div ref={containerRef} />
    </div>
  );
}
