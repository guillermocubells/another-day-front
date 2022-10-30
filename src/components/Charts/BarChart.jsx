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
import apiClient from "../../services/api-client";
import Loading from "../../components/Loading/Loading";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart() {
  const [moodList, setMoodList] = useState([]);
  console.log("moods:", moodList);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  let filterStatus = moodList.map((mood) => mood.status);
  // console.log("filter", filterStatus);

  let filterUnique = filterStatus.filter((v, i, a) => a.indexOf(v) === i);
  console.log("filterUnique", filterUnique);

  let countMood = (arr, mood) => {
    return arr.filter((n) => n === mood).length;
  };

  // console.log(countMood(filterStatus, "Good"));
  // console.log(countMood(filterStatus, "Okay"));

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("dashboard")
      .then((res) => {
        setMoodList(res.data);
      })
      .catch((error) => {
        console.error(error);
        console.log(errorMessage);
        setErrorMessage("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [errorMessage]);

  useEffect(() => {
    setChartData({
      // labels: filterUnique,
      // labels: filterStatus.filter((item, i, ar) => ar.indexOf(item) === i),
      labels: ["Awful", "Bad", "Okay", "Good", "Great"],
      datasets: [
        {
          label: "CheckIn",
          data: [
            countMood(filterStatus, "Awful"),
            countMood(filterStatus, "Bad"),
            countMood(filterStatus, "Okay"),
            countMood(filterStatus, "Good"),
            countMood(filterStatus, "Great"),
          ],
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
  }, [moodList, filterStatus]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}

export default BarChart;
