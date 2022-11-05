import "./MoodList.css";

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
    return <Loading />;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  const orderedMoods = moodList.reduce((acc, item) => {
    // normalize Date by setting time to 0 on every date
    const moodDate = new Date(item.date).setHours(0, 0, 0, 0);

    // check if object already has any entries
    if (!Object.keys(acc).length) {
      acc = { [moodDate]: [item] };
    } else {
      // check if there is already a value for the day, if not set it to current item.date
      if (acc[moodDate] === undefined || acc[moodDate] === null) {
        acc[moodDate] = [item];
      } else {
        // if there already is a object key for this day. Add current Item to the array
        acc[moodDate] = [...acc[moodDate], item];
      }
    }
    return acc;
  }, {});

  return (
    <section className="mood-list">
      <h1>Journal</h1>
      <div className="mood-list-wrapper">
        {Object.keys(orderedMoods)
          .sort((a, b) => {
            return b - a;
          })
          .map((day) => {
            return (
              <article key={day} className="mood-list__day-wrapper">
                <div className="mood-list__day-date">
                  <h2>{new Date(Number(day)).toDateString()}</h2>
                </div>
                <div className="mood-list__day-entries">
                  {orderedMoods[day]
                    .sort((a, b) => {
                      return new Date(b.date) - new Date(a.date);
                    })
                    .map((mood) => {
                      return <MoodListItem mood={mood} key={mood._id} />;
                    })}
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}

export default MoodList;
