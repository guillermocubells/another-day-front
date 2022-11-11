import styles from "./MoodListNotes.module.css";

import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { dateFormat } from "../../utils/date-helper";

function MoodListNotes({ id }) {
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
  const statusObjectSelection = (arr) => {
    let newArray = arr
      .filter(
        (n) =>
          (n.status === "Great" ||
            n.status === "Good" ||
            n.status === "Okay") &&
          n._id !== id
      )
      .filter((item) => {
        return item.journal !== "" || item.image !== "";
      });

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleArray(newArray);

    return newArray.slice(0, 3);
  };

  const greatArray = statusObjectSelection(moodList);

  return (
    <>
      {greatArray.length > 0 && (
        <>
          <section className={styles.moments}>
            <h5>Revisit some of your favorite moments</h5>
            <div className={styles.momentsWrapper}>
              {greatArray.map((item) => {
                const { _id, date, status } = item;
                return (
                  <Link key={_id} to={`/mood/${_id}`}>
                    <div className={styles.moment}>
                      <p>
                        {dateFormat(date)}{" "}
                        {new Date(date).toLocaleTimeString("es-es", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <h4>{status}</h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
          <hr />
        </>
      )}
    </>
  );
}

export default MoodListNotes;
