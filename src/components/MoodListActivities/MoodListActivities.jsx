import styles from "../MoodListActivities/MoodListActivities.module.css";

import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import Loading from "../Loading/Loading";
import PillSmall from "../Pills/PillSmall";

function MoodPageActivities({ mood }) {
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

  //Select the activities based on the mood that you select and clears duplicates
  const statusObjectSelection = (arr, mood) => {
    return arr
      .filter((n) => n.status === mood)
      .map((i) => i.activities)
      .flat(Infinity)
      .map((n) => n.title)
      .filter((element, index, arr) => {
        return arr.indexOf(element) === index;
      });
  };

  const greatArray = statusObjectSelection(moodList, "Great");
  const awfulArray = statusObjectSelection(moodList, "Awful");

  return (
    <>
      <hr />
      {greatArray.length > 0 && (
        <>
          <section className={styles.activities}>
            <h5>These are some of the activities that motivate you</h5>
            <div className={styles.activitiesWrapper}>
              {greatArray.map((activity) => {
                return <PillSmall key={activity}>{activity}</PillSmall>;
              })}
            </div>
          </section>
          <hr />
        </>
      )}
      {awfulArray.length > 0 && (
        <>
          <section className={styles.activities}>
            <h5>
              Avoid getting involved in these activities, they might drown you
            </h5>
            <div className={styles.activitiesWrapper}>
              {awfulArray.map((activity) => {
                return <PillSmall key={activity}>{activity}</PillSmall>;
              })}
            </div>
          </section>
          <hr />
        </>
      )}
    </>
  );
}

export default MoodPageActivities;
