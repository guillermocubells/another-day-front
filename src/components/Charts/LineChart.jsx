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

  console.log(errorMessage, handleSubmit);
  // Filter to getting all the moods
  let filterStatus = moodList.map((mood) => mood.status);
  // console.log("filter", filterStatus);

  // Formula to make a conversion to numbers based on the value of the substatus
  let arr2 = [];
  let statusConversion = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "Awful") {
        arr2.push(1);
      }
      if (arr[i] === "Bad") {
        arr2.push(2);
      }
      if (arr[i] === "Okay") {
        arr2.push(3);
      }
      if (arr[i] === "Good") {
        arr2.push(4);
      }
      if (arr[i] === "Great") {
        arr2.push(5);
      }
    }
    return arr2;
  };

  let status = statusConversion(filterStatus);
  console.log(status);
  // console.log(arr2);
  // console.log("Equiv", statusConversion(filterStatus));

  // Formula to get the actual days when the user checked in

  let filterActualDates = moodList.map((mood) => mood.date);
  console.log("Actual", filterActualDates);
  console.log(filterActualDates[0]);

  // Formula to convert the filterActualDates to numbers so is posible to compare them

  let convertedDates = filterActualDates.map((date) =>
    new Date(date).setHours(0, 0, 0, 0)
  );
  // console.log("Converted Dates", convertedDates);

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

  useEffect(() => {
    setChartData({
      labels: filterActualDates.map((date) =>
        new Date(date).toLocaleDateString()
      ),
      datasets: [
        {
          label: "CheckIn",
          data: status,
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
        },
      },
    });
  }, [moodList, filterActualDates, filterStatus, status]);

  if (isLoading) {
    return <Loading />;
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
        <button onclick={filterDates}>Filter</button>
        {/* <button onclick={filterDates}>Reset</button> */}
      </form>
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
