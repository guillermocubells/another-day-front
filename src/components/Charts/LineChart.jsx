import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import apiClient from "../../services/api-client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function LineChart() {
  const [moodList, setMoodList] = useState([]);
  console.log("moods:", moodList);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    apiClient
      .get("dashboard")
      .then((res) => {
        setMoodList(res.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("");
      })
      .finally(() => {
        setIsLoading(false);
      });
    setChartData({
      labels: moodList.map((mood) => mood.status),
      datasets: [
        {
          label: "CheckIn",
          data: moodList.map((mood) => mood.status),
          borderColor: "rgb(53,162,235)",
          backgroundColor: "rgba(53,162,235,0.4)",
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "CheckIn",
        },
      },
    });
  }, []);

  return (
    <div>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}

export default LineChart;

// const [dailyData, setDailyData] = useState([]);
// const [monthlyData, setMonthlyData] = useState([]);
// const [yearlyData, setYearlyData] = useState([]);

// const filteredData = dailyData || monthlyData || yearlyData;
// const lineChart = filteredData[0] ? (
//   <Line
//     data={{
//       labels: filteredData.map(({ date }) =>
//         new Date(date).toLocaleDateString()
//       ),
//       datasets: [
//         {
//           data: filteredData.map((data) => data.confirmed),
//           label: "Mood",
//           borderColor: "rgb(0, 217, 255)",
//           fill: true,
//         },
//       ],
//     }}
//   />
// ) : null;
