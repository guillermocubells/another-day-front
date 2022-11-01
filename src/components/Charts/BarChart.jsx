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

    setChartData({
      labels: ["Awful", "Bad", "Okay", "Good", "Great"],
      datasets: [
        {
          label: "CheckIn",
          data: [countAwful, countBad, countOkay, countGood, countGreat],
          borderColor: "rgb(53,162,235)",
          backgroundColor: "rgba(53,162,235,0.4)",
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "CheckIn",
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
