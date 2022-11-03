import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import Loading from "../../components/Loading/Loading";
import TotalMoodDistribution from "../../components/Charts/TotalMoodDistribution";
import RadarChart from "../../components/Charts/RadarChart";
import KeyMetrics from "../../components/Charts/KeyMetrics";

function DashboardPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/dashboard")
      .then((res) => {
        setData(res.data);
      })

      .catch((error) => {
        console.error(error);
        setErrorMessage("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <KeyMetrics data={data} />
      </div>
      <div>
        <h2>Total Mood Count</h2>
        <BarChart data={data} />
      </div>
      <div>
        <h2>Mood Tracker</h2>
        <LineChart data={data} />
      </div>
      <div>
        <h2>Mood Distribution</h2>
        <TotalMoodDistribution data={data} />
      </div>
      <div>
        <h2>Activity Mood Tracker</h2>
        <RadarChart data={data} />
      </div>
    </div>
  );
}

export default DashboardPage;
