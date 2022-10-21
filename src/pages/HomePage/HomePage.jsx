import "./HomePage.css";
import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import Loading from "../../components/Loading/Loading";
import MoodCheckInForm from "../../components/MoodCheckInForm/MoodCheckInForm";

function HomePage() {
  const [moodData, setMoodData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Getting Mood Data
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/api")
      .then((res) => {
        setMoodData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Mood Check</h1>
      <br />
      <MoodCheckInForm
        activities={moodData?.activities}
        mood_status={moodData?.mood_status}
      />
    </div>
  );
}

export default HomePage;
