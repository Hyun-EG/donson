"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/app/(components)/LoadingOverlay";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const MaplePointChart = ({
  data,
}: {
  data: { price: number; updateAt: string }[];
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data.length > 0) setIsLoading(false);
  }, [data]);

  const chartData = {
    labels: data.map((d) => d.updateAt),
    datasets: [
      {
        label: "메이플 포인트",
        data: data.map((d) => d.price),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.2,
        pointRadius: 5,
        pointHitRadius: 20,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => `가격: ${context.raw.toLocaleString()} 메포`,
        },
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "날짜 yy.MM.dd",
          displayFormats: {
            day: "yy년 MM월 dd일",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 3,
        },
        adapters: {
          date: {
            locale: ko,
          },
        },
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  } as const;

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <Line data={chartData} options={options} />
      )}
    </>
  );
};

export default MaplePointChart;
