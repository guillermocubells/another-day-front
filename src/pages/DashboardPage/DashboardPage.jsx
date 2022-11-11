import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import Loading from "../../components/Loading/Loading";
import TotalMoodDistribution from "../../components/Charts/TotalMoodDistribution";
// import RadarChart from "../../components/Charts/RadarChart";
import KeyMetrics from "../../components/Charts/KeyMetrics";
import "./DashboardPage.css";
import ButtonRegular from "../../components/Buttons/ButtonRegular";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  if (data.length === 0) {
    function handleClick(e) {
      navigate("/");
    }

    return (
      <main className="dashboard-preview">
        <h1>We need more data.</h1>
        <h3>
          Start tracking your mood first, statistics and $ will come later. Come
          back some other time.
        </h3>
        <ButtonRegular customClass={"white"} handleClick={handleClick}>
          Check In
        </ButtonRegular>
      </main>
    );
  }

  return (
    <main className="dashboard-layout">
      <h1>Dashboard</h1>
      <div className="chart-cards">
        <KeyMetrics data={data} />
      </div>
      <div className="chart-layout">
        <div className="chart-column-1">
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
          <h2>Total Mood Distribution</h2>
          <br />
          <TotalMoodDistribution className="chart-cards" data={data} />
        </div>
        {/* <div>
          <h2>Activity Mood Tracker</h2>
          <RadarChart data={data} />
        </div> */}
      </div>
    </main>
  );
}

export default DashboardPage;
