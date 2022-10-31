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
import Loading from "../../components/Loading/Loading";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
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
  const [filter, setFilter] = useState({
    date: new Date(),
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFilter({ ...filter, [name]: value });
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

  // Formula to get the actual days when the user checked in
  let filterActualDates = moodList.map((mood) => mood.date);
  console.log("Actual", filterActualDates);
  console.log(errorMessage, handleSubmit);
  // Formula to convert the filterActualDates to numbers so is posible to compare them later
  let convertedDates = filterActualDates.map((date) =>
    new Date(date).setHours(0, 0, 0, 0)
  );
  // console.log("Converted Dates", convertedDates);

  useEffect(() => {
    setChartData({
      labels: dateConversion(moodList),
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
        xAxis: {
          // type: "time",
          time: { unit: "day" },
        },
        yAxis: {
          suggestedMin: 0,
          suggestedMax: 6,
        },
      },
    });
  }, [moodList]);

  if (isLoading) {
    return <Loading />;
  }

  //Function that filters days on the chart

  function filterDates() {
    //Gets and converts the start value from the input field into a number
    const start1 = new Date(document.getElementById("start").value);
    const start = start1.setHours(0, 0, 0, 0);
    //Gets and converts the end value from the input field into a number
    const end1 = new Date(document.getElementById("end").value);
    const end = end1.setHours(0, 0, 0, 0);

    //Filters the days out based on the filter selected
    const filterDates = convertedDates.filter(
      (date) => date >= start && date <= end
    );

    //Set ChartData labels to the filterDates
    setChartData.labels = filterDates;

    //Creates a start and end array based on the index of the filterDates
    const startArray = convertedDates.indexOf(filterDates[0]);
    const endArray = convertedDates.indexOf(
      filterDates[filterDates.length - 1]
    );

    // Makes a copy of the filtered data from the convertedDates
    const copyFilterData = [...convertedDates];
    copyFilterData.splice(endArray + 1, filterDates.length);
    copyFilterData.splice(0, startArray);

    console.log(copyFilterData);

    //Set ChartData datasets to the filteredDates
    setChartData.datasets[0].data = copyFilterData;

    //Updates the chart data
    setChartData.update();
  }

  return (
    <div>
      <Line options={chartOptions} data={chartData} />
      <form>
        {/* TODO! Make datetime display current time as default  */}
        <label>
          Start Date
          <input
            id="start"
            type="date"
            onChange={handleChange}
            value={filter.date}
            min=""
            max=""
          ></input>
        </label>
        <label>
          End Date
          <input
            id="end"
            type="date"
            onChange={handleChange}
            value={filter.date}
            min=""
            max=""
          ></input>
        </label>
        <button onClick={filterDates}>Filter</button>
        {/* <button onclick={filterDates}>Reset</button> */}
      </form>
    </div>
  );
}
export default LineChart;
