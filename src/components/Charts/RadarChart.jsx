import React, { useState, useEffect } from "react";
import { compareAsc } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
  RadarController,
  RadialLinearScale,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import Loading from "../../components/Loading/Loading";
import "chartjs-adapter-date-fns";

ChartJS.register(
  RadarController,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Legend
);

function RadarChart({ data }) {
  const [moodList] = useState(
    data.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
  );

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  console.log("moodList", moodList);
  const [chartOptions, setChartOptions] = useState({});

  //   const [form, setForm] = useState({
  //     start: new Date(),
  //     end: new Date(),
  //   });

  //   function handleChange(evt) {
  //     const { name, value } = evt.target;
  //     setForm({ ...form, [name]: value });
  //   }

  //Need to filter through the array and get the activities as string in the dashboard
  function getChartActivities(arr) {
    return arr.map((e) => e.activities);
  }

  console.log(getChartActivities(moodList));

  useEffect(() => {
    setChartData({
      labels: ["Awful", "Bad", "Okay", "Good", "Great"],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 90, 81, 89],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
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
      scales: {
        x: {
          time: { unit: "day" },
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 6,
        },
      },
    });
  }, [moodList]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <Radar options={chartOptions} data={chartData} />
    </div>
  );
}
export default RadarChart;
