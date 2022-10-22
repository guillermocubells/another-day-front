import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import apiClient from "../../services/api-client";
import Chart from "../../components/Chart/Chart";

//Useful function for filtering
// function forFiltering(date) {
//   const [data, setData] = useState({});
//   const year = data.date.getFullYear();
//   const month = data.date.getMonth() + 1;
//   const day = data.date.getDate();

//   return `${year}-${makeZeroDate(month)}-${makeZeroDate(day)}`;
// }

function DashboardPage() {
  const [moods, setMoods] = useState();
  console.log("moods:", moods);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    apiClient
      .get("/dashboard")
      .then((res) => {
        setMoods(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <Chart data={data} />
    </div>
  );
}

export default DashboardPage;
