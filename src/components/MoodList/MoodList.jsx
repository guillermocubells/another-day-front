import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import Loading from "../Loading/Loading";
import MoodListItem from "../MoodListItem/MoodListItem";

function MoodList() {
  const [moodList, setMoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/api/mood/get-all")
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

  if (isLoading) {
    <Loading />;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <section>
      {moodList.map((mood) => {
        return <MoodListItem mood={mood} key={mood._id} />;
      })}
    </section>
  );
}

export default MoodList;
