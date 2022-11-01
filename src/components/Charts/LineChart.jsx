import React, { useState, useEffect } from "react";
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
import apiClient from "../../services/api-client";
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

// Status Conversion Function
let statusConversion = (arr) => {
  let arr2 = [];
  let arr1 = arr.map((mood) => mood.status);
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === "Awful") {
      arr2.push(1);
    }
    if (arr1[i] === "Bad") {
      arr2.push(2);
    }
    if (arr1[i] === "Okay") {
      arr2.push(3);
    }
    if (arr1[i] === "Good") {
      arr2.push(4);
    }
    if (arr1[i] === "Great") {
      arr2.push(5);
    }
  }
  return arr2;
};

// Date Conversion Function
let dateConversion = (arr) => {
  let arr3 = [];
  let arr1 = arr.map((mood) => mood.date);
  for (let i = 0; i < arr1.length; i++) {
    arr3.push(new Date(arr1[i]).toLocaleDateString());
  }
  return arr3;
};

//FILTER FUNCTION
// Date Conversion to Numbers
let convertedDates = (arr) => {
  let arr5 = [];
  let arr4 = arr.map((mood) => mood.date);
  for (let i = 0; i < arr4.length; i++) {
    arr5.push(new Date(arr4[i]).setHours(0, 0, 0, 0));
  }
  return arr5;
};

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
  const [form, setForm] = useState({
    date: new Date(),
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
  }

  useEffect(() => {
    setIsLoading(true);
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
  }, []);

  console.log(errorMessage, handleSubmit, handleChange);

  console.log("Converted Dates", convertedDates(moodList));
  // console.log(convertedDates(moodList));

  useEffect(() => {
    setChartData({
      labels: dateConversion(moodList),
      // labels: convertedDates(moodList),
      datasets: [
        {
          label: "CheckIn",
          data: statusConversion(moodList),
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
          // type: "time",
          time: { unit: "day" },
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 6,
        },
      },
    });
  }, [moodList]);

  if (isLoading) {
    return <Loading />;
  }

  //Filter function on Chart

  function filterDate() {
    const daysOfUser = [...dateConversion(moodList)];
    console.log(daysOfUser);

    //Gets the start and end date of the filter
    const start1 = new Date(document.getElementById("start").value);
    const end1 = new Date(document.getElementById("end").value);
    console.log("start:", start1, "end:", end1);

    const indexStartDate = daysOfUser.indexOf(start1.value);
    const indexEndDate = daysOfUser.indexOf(end1.value);
    console.log(
      "Index start of user",
      indexStartDate,
      "Index end of user",
      indexEndDate
    );
    // closest to a certain number

    //Filters the days out based on the filter selected
    const filterDates = daysOfUser.slice(indexStartDate, indexEndDate + 1);
    console.log(filterDates);

    //Set ChartData labels to the filterDates
    setChartData.labels = filterDates;

    // Makes a copy of the filtered data from the convertedDates
    const copyFilterData = [...statusConversion(moodList)];
    console.log("copy user data", copyFilterData);

    const filterDataPoints = daysOfUser.slice(indexStartDate, indexEndDate + 1);
    console.log(filterDataPoints);

    //Set ChartData datasets to the filteredDates
    setChartData.datasets[0].data = filterDataPoints;
    // setChartData({
    //   ...chartData,
    //   datasets: [...datasets, datasets[0]:{data} ],
    // });
    //Updates the chart data
    setChartData.update();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* TODO! Make datetime display current time as default  */}
        <label>
          Start Date
          <input
            id="start"
            type="date"
            onChange={filterDate}
            value={form.date}
            min={dateConversion(moodList)[0]}
            max={dateConversion(moodList)[-1]}
          ></input>
        </label>
        <label>
          End Date
          <input
            id="end"
            type="date"
            onChange={filterDate}
            value={form.date}
            // min=""
            // max=""
          ></input>
        </label>
        <button onClick={filterDate}>Filter</button>
        {/* <button onclick={filterDates}>Reset</button> */}
      </form>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}
export default LineChart;
