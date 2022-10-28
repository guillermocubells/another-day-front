import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";

//Useful function for filtering
// function forFiltering(date) {
//   const [data, setData] = useState({});
//   const year = data.date.getFullYear();
//   const month = data.date.getMonth() + 1;
//   const day = data.date.getDate();

//   return `${year}-${makeZeroDate(month)}-${makeZeroDate(day)}`;
// }

function DashboardPage() {
  const [moodList, setMoodList] = useState([]);
  // console.log("moods:", moodList);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/dashboard")
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
      {/* 
      {moodList.map((mood) => {
        return (
          <div
            mood={mood}
            key={mood._id}
            onClick={() => {
              navigate(`/moods/${mood._id}`);
            }}
          >
            {mood.status}
          </div>
        );
      })} */}
    </div>
  );
}

export default DashboardPage;
