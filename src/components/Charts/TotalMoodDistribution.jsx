import "./TotalMoodDistribution.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Loading from "../Loading/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);
const MOODS = ["Awful", "Bad", "Okay", "Good", "Great"];

function TotalMoodDistribution({ data }) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const [moodDistribution] = useState(
    MOODS.map((mood) => {
      return {
        status: mood,
        count: data.filter((item) => item.status === mood).length,
      };
    })
  );

  useEffect(() => {
    const MOOD_COLORS = {
      awful: getComputedStyle(document.body).getPropertyValue("--color-awful"),
      bad: getComputedStyle(document.body).getPropertyValue("--color-bad"),
      okay: getComputedStyle(document.body).getPropertyValue("--color-okay"),
      good: getComputedStyle(document.body).getPropertyValue("--color-good"),
      great: getComputedStyle(document.body).getPropertyValue("--color-great"),
    };

    setChartData({
      labels: moodDistribution.map((item) => item.status),
      datasets: [
        {
          data: moodDistribution.map(
            (item) => (item.count / data.length) * 100
          ),
          backgroundColor: [
            MOOD_COLORS.awful,
            MOOD_COLORS.bad,
            MOOD_COLORS.okay,
            MOOD_COLORS.good,
            MOOD_COLORS.great,
          ],
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    });
  }, [data, moodDistribution]);

  if (!data) {
    return <Loading />;
  }

  return (
    <article className="mood-distribution">
      {<Doughnut options={chartOptions} data={chartData} />}
      <br />
      <footer>
        {moodDistribution
          .slice()
          .reverse()
          .map((item) => {
            return (
              <div key={item.status}>
                {item.status} x <span>{item.count}</span>
              </div>
            );
          })}
      </footer>
    </article>
  );
}

export default TotalMoodDistribution;
