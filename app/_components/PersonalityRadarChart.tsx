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
  const labels = ["카리스마", "감성", "통찰력", "의지", "손재주", "매력"];

  useEffect(() => {
    console.log(propensity);
  }, [propensity]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "성향 수치",
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
