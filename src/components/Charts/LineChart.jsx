import React, { useState, useEffect } from "react";
import { compareAsc, closestIndexTo } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loading from "../../components/Loading/Loading";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Legend
);

function LineChart({ data }) {
  const [moodList] = useState(
    data.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
  );

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  console.log("moodList", moodList);
  const [chartOptions, setChartOptions] = useState({});

  const [form, setForm] = useState({
    start: new Date(),
    end: new Date(),
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  }

  function getChartDates(arr) {
    return arr.map((e) => new Date(e.date).toLocaleDateString());
  }

  function getChartScore(arr) {
    return arr.map((e) => e.score);
  }

  useEffect(() => {
    setChartData({
      labels: getChartDates(moodList),
      datasets: [
        {
          label: "CheckIn",
          data: getChartScore(moodList),
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

  function filterDate(e) {
    e.preventDefault();

    const firstDate = closestIndexTo(
      new Date(form.start).setHours(0, 0, 0, 0),
      moodList.map((e) => parseInt(new Date(e.date).getTime().toFixed(0)))
    );

    const lastDate = closestIndexTo(
      new Date(form.end).setHours(23, 23, 23, 23),
      moodList.map((e) => parseInt(new Date(e.date).getTime().toFixed(0)))
    );

    //Filters the days out based on the filter selected
    const filterDates = getChartDates(moodList.slice(firstDate, lastDate + 1));

    // filters scores based on the filter selected
    const filterDataPoints = getChartScore(
      moodList.slice(firstDate, lastDate + 1)
    );

    setChartData({
      ...chartData,
      labels: filterDates,
      datasets: [{ ...chartData.datasets[0], data: filterDataPoints }],
    });
  }

  function resetDate(e) {
    e.preventDefault();
    setChartData({
      ...chartData,
      labels: getChartDates(moodList),
      datasets: [{ ...chartData.datasets[0], data: getChartScore(moodList) }],
    });
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <form onSubmit={(filterDate, resetDate)}>
        {/* TODO! Make datetime display current time as default  */}
        <label>
          Start Date
          <input
            name="start"
            type="date"
            onChange={handleChange}
            value={form.start}
            min={getChartDates(moodList)[0]}
            max={getChartDates(moodList)[moodList.length - 1]}
          ></input>
        </label>
        <label>
          End Date
          <input
            name="end"
            type="date"
            onChange={handleChange}
            value={form.end}
            min={form.start}
            max={getChartDates(moodList)[moodList.length - 1]}
          ></input>
        </label>
        <button onClick={filterDate}>Filter</button>
        <button onClick={resetDate}>Reset</button>
      </form>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}
export default LineChart;
