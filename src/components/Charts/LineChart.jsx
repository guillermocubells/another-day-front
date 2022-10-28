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

  let filterStatus = moodList.map((mood) => mood.status);
  console.log("filter", filterStatus);

  // let filterUnique = filterStatus.filter((v, i, a) => a.indexOf(v) === i);
  // // console.log("filterUnique", filterUnique);

  let conversion = filterStatus.filter((element) => {
    const arr3 = [];
    if (element === "Awful") {
      arr3.push("1");
    }
    if (element === "Bad") {
      arr3.push(2);
    }
    if (element === "Okay") {
      arr3.push(3);
    }
    if (element === "Good") {
      arr3.push(4);
    }
    if (element === "Great") {
      arr3.push(5);
    }
    return arr3;
  });

  console.log(conversion);

  let statusConversion = (arr) => {
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (i === "Awful") {
        return arr2.push(1);
      }
      if (i === "Bad") {
        return arr2.push(2);
      }
      if (i === "Okay") {
        return arr2.push(3);
      }
      if (i === "Good") {
        return arr2.push(4);
      }
      if (i === "Great") {
        return arr2.push(5);
      }
    }
    return arr2;
  };

  console.log(statusConversion(filterStatus));

  useEffect(() => {
    setChartData({
      labels: moodList.map((mood) => mood.date),
      datasets: [
        {
          label: "CheckIn",
          data: [1, 2, 3],
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

  if (isLoading) {
    return <Loading />;
  }

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
