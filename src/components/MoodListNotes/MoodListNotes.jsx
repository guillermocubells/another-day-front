import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import Loading from "../Loading/Loading";
import PillSmall from "../Pills/PillSmall";
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
    return arr
      .filter((n) => n.status === mood)
      .map((i) => i.journal)
      .filter((element) => {
        return element !== "";
      });
  };
  console.log(statusObjectSelection(moodList, "Great"));
  //   //   console.log(statusObjectSelection(moodList, "Great"));

  return (
    <section className="mood-list">
      <div className="mood-list-wrapper"></div>
      <br />
      <h5>These are some of the notes you took on your best days</h5>
      <div>
        {statusObjectSelection(moodList, "Great").map((journal) => {
          return (
            <div key={journal} className="pill-moodpage">
              <PillSmall content={journal} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MoodListNotes;
