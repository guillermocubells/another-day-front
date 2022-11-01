import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import Loading from "../../components/Loading/Loading";

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
        <h2>Bar Chart</h2>
        <BarChart data={data} />
      </div>
      <div>
        <h2>Line Chart</h2>
        <LineChart data={data} />
      </div>
    </div>
  );
}

export default DashboardPage;
