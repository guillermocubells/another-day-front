import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import Loading from "../Loading/Loading";
import "../Pills/PillSmall.css";
import "../MoodListActivities/MoodListActivities.css";

function MoodListNotes() {
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
    return <Loading />;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  console.log(moodList);
  //Select the activities based on the mood that you select and clears duplicates
  const statusObjectSelection = (arr, mood) => {
    return arr.filter((n) => n.status === mood);
    // .map((i) => i.activities)
    // .flat(Infinity)
    // .map((n) => n.title)
    // .filter((element, index, arr) => {
    //   return arr.indexOf(element) === index;
    // });
  };
  console.log(statusObjectSelection(moodList, "Great"));
  //   //   console.log(statusObjectSelection(moodList, "Great"));

  return <section></section>;
}

export default MoodListNotes;
