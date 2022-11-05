import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Loading from "../../components/Loading/Loading";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ data }) {
  const [moodList] = useState(data);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  let countMood = (arr, mood) => {
    return arr.filter((n) => n.status === mood).length;
  };

  useEffect(() => {
    let countAwful = countMood(moodList, "Awful");
    let countBad = countMood(moodList, "Bad");
    let countOkay = countMood(moodList, "Okay");
    let countGood = countMood(moodList, "Good");
    let countGreat = countMood(moodList, "Great");

    const MOOD_COLORS = {
      awful: getComputedStyle(document.body).getPropertyValue("--color-awful"),
      bad: getComputedStyle(document.body).getPropertyValue("--color-bad"),
      okay: getComputedStyle(document.body).getPropertyValue("--color-okay"),
      good: getComputedStyle(document.body).getPropertyValue("--color-good"),
      great: getComputedStyle(document.body).getPropertyValue("--color-great"),
    };

    setChartData({
      labels: ["Awful", "Bad", "Okay", "Good", "Great"],
      datasets: [
        {
          data: [countAwful, countBad, countOkay, countGood, countGreat],
          borderColor: "rgb(53,162,235)",
          backgroundColor: [
            MOOD_COLORS.awful,
            MOOD_COLORS.bad,
            MOOD_COLORS.okay,
            MOOD_COLORS.good,
            MOOD_COLORS.great,
          ],
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          time: { unit: "day" },
          grid: { display: false },
        },
        y: {
          grid: { display: false },
          ticks: {
            display: false,
            fontSize: 40,
            stepSize: 0.5,
            maxTicksLimit: 5,
          },
        },
      },
    });
  }, [moodList]);

  if (!data) {
    return <Loading />;
  }
  return (
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}

export default BarChart;
