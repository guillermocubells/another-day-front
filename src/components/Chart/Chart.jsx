import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

function LineChart() {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  const filteredData = dailyData || monthlyData || yearlyData;
  const lineChart = filteredData[0] ? (
    <Line
      data={{
        labels: filteredData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: filteredData.map((data) => data.confirmed),
            label: "Mood",
            borderColor: "rgb(0, 217, 255)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  return (
    <div>
      {" "}
      <div>{lineChart}</div>
    </div>
  );
}

export default LineChart;
