import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import Loading from "../../components/Loading/Loading";
import TotalMoodDistribution from "../../components/Charts/TotalMoodDistribution";
// import RadarChart from "../../components/Charts/RadarChart";
import KeyMetrics from "../../components/Charts/KeyMetrics";
import "./DashboardPage.css";

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
    <div className="dashboard-layout">
      <h1>Dashboard</h1>
      <div className="chart-cards">
        <h2>Key Metrics</h2>
        <br />
        <KeyMetrics data={data} />
      </div>
      <div className="chart-layout">
        <div>
          <div className="chart-cards">
            <h2>Mood Counter</h2>
            <br />
            <BarChart data={data} />
          </div>
          <div className="chart-cards">
            <h2>Mood Tracker</h2>
            <br />
            <LineChart data={data} />
          </div>
        </div>
        <div className="chart-cards">
          <h2>Mood Distribution</h2>
          <br />
          <TotalMoodDistribution className="chart-cards" data={data} />
        </div>
        {/* <div>
          <h2>Activity Mood Tracker</h2>
          <RadarChart data={data} />
        </div> */}
      </div>
    </div>
  );
}

export default DashboardPage;
