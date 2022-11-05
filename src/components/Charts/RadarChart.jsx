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
  const [form, setForm] = useState({});

  //  const [form, setForm] = useState({
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

  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setForm({ ...form, [name]: value });
  // }

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
        {
          label: "My Second Dataset",
          data: [90, 90, 80, 31, 89],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
        {
          label: "My Third Dataset",
          data: [45, 45, 67, 45, 45],
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

  function toggleActivity(value) {
    value.preventDefault();

    // setChartData({
    //   ...chartData,
    //   // labels: filterDates,
    //   datasets: [{ ...chartData.isDatasetVisible(0) }],
    //   // datasets: [{ ...chartData.datasets[0], data: filterDataPoints }],
    // });
    // console.log(
    //   setChartData({
    //     ...chartData,
    //     // labels: filterDates,
    //     datasets: [{ ...chartData.isDatasetVisible(0) }],
    //     // datasets: [{ ...chartData.datasets[0], data: filterDataPoints }],
    //   })
    // );
    console.log(chartData.datasets[0].isDatasetVisible(value));
    console.log(value.target);
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <Radar options={chartOptions} data={chartData} />
      <div className="">
        <form onSubmit={toggleActivity}>
          {/* have to do here sort of a map for all of the activities */}
          <button onClick={toggleActivity}>Family</button>
          <button onClick={toggleActivity}>Sports</button>
          <button onClick={toggleActivity}>Spirituality</button>
        </form>
      </div>
    </div>
  );
}
export default RadarChart;
