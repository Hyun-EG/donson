import React, { useEffect } from "react";
import { PersonalityRadarChartProps } from "./types";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PersonalityRadarChart = ({
  propensity,
}: {
  propensity: PersonalityRadarChartProps;
}) => {
  const labels = [
    `카리스마 ${propensity?.charisma_level}`,
    `감성 ${propensity?.sensibility_level}`,
    `통찰력 ${propensity?.insight_level}`,
    `의지 ${propensity?.willingness_level}`,
    `손재주 ${propensity?.handicraft_level}`,
    `매력 ${propensity?.charm_level}`,
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: [
          propensity?.charisma_level,
          propensity?.sensibility_level,
          propensity?.insight_level,
          propensity?.willingness_level,
          propensity?.handicraft_level,
          propensity?.charm_level,
        ],
        backgroundColor: "rgba(243, 11, 11, 0.2)",
        borderColor: "#0EA5E9",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 25, backdropColor: "transparent" },
        pointLabels: {
          font: { size: 12 },
          color: "#000000",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default PersonalityRadarChart;
